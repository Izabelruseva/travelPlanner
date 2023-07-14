import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";
import { Trip, createTrip } from "src/requests/trip";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const iconMarkup = renderToStaticMarkup(<div> &#9733; </div>);
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
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [state, setState] = React.useState<ITrip>({
    title: "",
    destinations: [],
    startDate: "",
    endDate: "",
    budget: 0,
    description: "",
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
      const fileURLs = files.map((file) => URL.createObjectURL(file));
      setUploadedImages(fileURLs);
    }
  };

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
    const { title, destinations, startDate, endDate, budget, description } =
      state;

    createTrip({ title, description, startDate, endDate, budget: +budget });

    navigate(routerPathEnum);
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
          <h1 className="trip-heading">We plan you travel</h1>
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
                  <div key={index}>
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
                      className="btn"
                      onClick={() => removeDestination(index)}
                    >
                      remove
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

                {uploadedImages.map((image, index) => (
                  <img key={index} src={image} alt={`Uploaded ${index}`} />
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
                  onClick={(e) => onClickTrip(RouterPathEnum.MEMBER, e)}
                >
                  Save my info and see other ideas
                </button>
                <button
                  className="btn"
                  onClick={(e: React.MouseEvent) =>
                    onClickTrip(RouterPathEnum.MEMBER, e)
                  }
                >
                  See other's trip ideas
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
