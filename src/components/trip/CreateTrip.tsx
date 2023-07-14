import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "../../components/trip/createTrip.css";
import { Trip, createTrip } from "src/requests/trip";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Image } from "src/requests/image";
import { getCountryName } from "src/requests/destination";
import { notification } from "antd";

const iconMarkup = renderToStaticMarkup(<div> 🚩 </div>);
const customMarkerIcon = divIcon({
  html: iconMarkup,
});

interface IDestination {
  city: { lat: number; lng: number };
}

interface ITrip {
  title: string;
  destinations: IDestination[];
  startDate: string;
  endDate: string;
  budget: number;
  description: string;
  images: Image[];
}

const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [destinationModalIsOpen, setDestinationModalIsOpen] =
    React.useState(false);
  const [destinationMarkerPosition, setDestinationMarkerPosition] =
    React.useState<[number, number]>([51.505, -0.09]);
  const [currentDestinationIndex, setCurrentDestinationIndex] = React.useState<
    number | null
  >(null);
  const [uploadedImages, setUploadedImages] = React.useState<File[]>([]);
  const [state, setState] = React.useState<ITrip>({
    title: "",
    destinations: [],
    startDate: "",
    endDate: "",
    budget: 0,
    description: "",
    images: [],
  });

  function MapEvents({
    setMarkerPosition,
  }: {
    setMarkerPosition: (pos: [number, number]) => void;
  }) {
    const map = useMap();

    React.useEffect(() => {
      const handleClick = (e: any) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      };

      map.on("click", handleClick);

      return () => {
        map.off("click", handleClick);
      };
    }, [map, setMarkerPosition]);

    return null;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name as keyof ITrip]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedImages(files);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  React.useEffect(() => {
    const fetchImageData = async () => {
      const images: Image[] = await Promise.all(
        uploadedImages.map(async (file) => {
          const base64 = await convertToBase64(file);
          return { base64 };
        })
      );
      setState((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...images],
      }));
    };

    if (uploadedImages.length > 0) {
      fetchImageData();
    }
  }, [uploadedImages]);

  const handleLocationChange = (
    index: number,
    location: { lat: number; lng: number }
  ) => {
    setState((prevState) => {
      const newDestinations = [...prevState.destinations];
      newDestinations[index] = { city: location };
      return {
        ...prevState,
        destinations: newDestinations,
      };
    });
  };

  const onClickTrip = (
    routerPathEnum: RouterPathEnum,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    const {
      title,
      destinations,
      startDate,
      endDate,
      budget,
      description,
      images,
    } = state;

    const getCountryPromises = destinations.map((destination) => {
      return getCountryName(
        destination.city.lat.toString(),
        destination.city.lng.toString()
      );
    });

    Promise.all(getCountryPromises).then(async (countryNames) => {
      const trip: Trip = {
        title,
        description,
        startDate,
        endDate,
        budget: +budget,
        images,
        destinations: destinations.map((destination, index) => ({
          name: "Destination to " + countryNames[index],
          coordinates: `${destination.city.lat} ${destination.city.lng}`,
        })),
      };

      const response = await createTrip(trip);

      if (response === 200) {
        notification.success({
          message: 'Creation Successful!',
          description: 'You successfully created a trip!'
        })
        navigate(routerPathEnum);
      }

      if (response === 400 || response === 401) {
        notification.error({
          message: 'Unauthorized!',
          description: 'You need to be logged in to do that!',
        });
      } else if (response === 500) {
        notification.error({
          message: 'Server Error',
          description: 'An internal server error occurred. Please try again later.',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'An error occurred during trip creation. Please try again.',
        });
      }
    });
  };

  const addDestination = () => {
    setState((prevState) => ({
      ...prevState,
      destinations: [...prevState.destinations, { city: { lat: 0, lng: 0 } }],
    }));
  };

  const removeDestination = (index: number) => {
    setState((prevState) => {
      const newDestinations = [...prevState.destinations];
      newDestinations.splice(index, 1);
      return {
        ...prevState,
        destinations: newDestinations,
      };
    });
  };

  return (
    <>
      <div className="trip-page">
        <img
          className="background"
          src={require("src/assets/trip-background.ico")}
        />
        <div className="trip-all">
          <h1 className="trip-heading">We plan your travel</h1>
          <p className="trip-info">
            We understand that each traveler is unique, with different
            preferences, interests, and budgets. That's why we take pride in
            offering a personalized approach to travel planning. Whether you're
            seeking a luxurious beach getaway, an adrenaline-fueled adventure,
            or a cultural immersion, we are here to curate an experience that
            aligns with your aspirations.
          </p>
          <span className="trip-text-span">
            <form data-tab="search-1" className="search">
              <div className="search_dest">
                <label className="search__label">
                  Choose your destination and preferences
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Trip To Dubai"
                  className="search__input"
                  autoComplete="off"
                  onChange={handleInputChange}
                  onClick={() => setModalIsOpen(true)}
                  value={state.title}
                />
                <input
                  type="date"
                  name="startDate"
                  placeholder="Start date"
                  className="search__input"
                  autoComplete="on"
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="endDate"
                  placeholder="End date"
                  className="search__input"
                  autoComplete="on"
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="budget"
                  placeholder="Max budget..."
                  className="search__input"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Add description..."
                  className="search__input"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                {state.destinations.map((destination, index) => (
                  <div className="dest" key={index}>
                    <input
                      type="text"
                      name={`destination${index}`}
                      placeholder="Destination City"
                      className="search__input"
                      autoComplete="off"
                      onClick={() => {
                        setDestinationModalIsOpen(true);
                        setCurrentDestinationIndex(index);
                      }}
                      value={
                        destination.city.lat !== 0 && destination.city.lng !== 0
                          ? `Lat: ${destination.city.lat}, Lng: ${destination.city.lng}`
                          : ""
                      }
                    />

                    <button
                      type="button"
                      className="x"
                      onClick={() => removeDestination(index)}
                    >
                      X
                    </button>
                    <Modal
                      isOpen={
                        destinationModalIsOpen &&
                        currentDestinationIndex === index
                      }
                      onRequestClose={() => {
                        setDestinationModalIsOpen(false);
                        handleLocationChange(index, {
                          lat: destinationMarkerPosition[0],
                          lng: destinationMarkerPosition[1],
                        });
                      }}
                    >
                      <div style={{ height: "100vh", width: "100%" }}>
                        <MapContainer
                          center={destinationMarkerPosition}
                          zoom={13}
                          style={{ height: "100%", width: "100%" }}
                          scrollWheelZoom={false}
                        >
                          <MapEvents
                            setMarkerPosition={setDestinationMarkerPosition}
                          />
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={destinationMarkerPosition}
                            icon={customMarkerIcon}
                          >
                            <Popup>
                              A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                          </Marker>
                        </MapContainer>
                      </div>
                    </Modal>
                  </div>
                ))}
                <button type="button" className="btn" onClick={addDestination}>
                  Add Destination
                </button>

                {state.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.base64}
                    alt={`Uploaded ${index}`}
                  />
                ))}
                <input
                  type="file"
                  name="image"
                  className="search__input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  multiple
                />

                <button
                  className="btn"
                  onClick={(e) => onClickTrip(RouterPathEnum.TRIPS, e)}
                >
                  Save my info and see other ideas
                </button>
                <button
                  className="btn"
                  onClick={(e: React.MouseEvent) =>
                    onClickTrip(RouterPathEnum.TRIPS, e)
                  }
                >
                  See ideas
                </button>
              </div>
            </form>
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;