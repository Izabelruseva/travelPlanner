import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";
import { Trip, createTrip } from "src/requests/trip";
import Modal from "react-modal";

interface ITrip {
  title: string;
  fromCity: { lat: number; lng: number };
  toCity: { lat: number; lng: number };
  startDate: string;
  endDate: string;
  budget: number;
  description: string;
}

const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [state, setState] = React.useState<ITrip>({
    title: "",
    fromCity: { lat: 0, lng: 0 },
    toCity: { lat: 0, lng: 0 },
    startDate: "",
    endDate: "",
    budget: 0,
    description: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name as keyof ITrip]: value,
    }));
  };

  const handleLocationChange = (
    name: "fromCity" | "toCity",
    location: { lat: number; lng: number }
  ) => {
    setState((prevState) => ({
      ...prevState,
      [name]: location,
    }));
  };

  const onClickTrip = (
    routerPathEnum: RouterPathEnum,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    const { title, fromCity, toCity, startDate, endDate, budget, description } =
      state;

    createTrip({ title, description, startDate, endDate, budget: +budget });

    navigate(routerPathEnum);
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
                  className="search__input "
                  autoComplete="off"
                  onChange={handleInputChange}
                  onClick={() => setModalIsOpen(true)}
                />

                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setModalIsOpen(false)}
                >
                  <div className="modal-container">
                    <div className="modal-content">
                      <MapContainer
                        center={[51.505, -0.09]}
                        zoom={13}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                          <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </div>
                </Modal>
                <input
                  type="date"
                  name="startDate"
                  placeholder="Start date"
                  className="search__input "
                  autoComplete="on"
                  onChange={handleInputChange}
                />
                <input
                  type="date"
                  name="endDate"
                  placeholder="End date"
                  className="search__input "
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
