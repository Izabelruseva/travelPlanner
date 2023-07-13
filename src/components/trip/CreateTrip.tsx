import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";
import { Trip, createTrip } from "src/requests/trip";
import Modal from 'react-modal';
import 'leaflet/dist/leaflet.css';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const iconMarkup = renderToStaticMarkup(
  <div>
    Test
  </div>
);
const customMarkerIcon = divIcon({
  html: iconMarkup
});

interface ITrip {
  title: string;
  fromCity: { lat: number, lng: number };
  toCity: { lat: number, lng: number };
  startDate: string;
  endDate: string;
  budget: number;
  description: string;
}

const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [fromCityModalIsOpen, setFromCityModalIsOpen] = React.useState(false);
  const [toCityModalIsOpen, setToCityModalIsOpen] = React.useState(false);
  const [fromCityMarkerPosition, setFromCityMarkerPosition] = React.useState<[number, number]>([51.505, -0.09]);
  const [toCityMarkerPosition, setToCityMarkerPosition] = React.useState<[number, number]>([51.505, -0.09]);
  const [state, setState] = React.useState<ITrip>({
    title: "",
    fromCity: { lat: 0, lng: 0 },
    toCity: { lat: 0, lng: 0 },
    startDate: "",
    endDate: "",
    budget: 0,
    description: "",
  });

  function MapEvents({ setMarkerPosition }: { setMarkerPosition: (pos: [number, number]) => void }) {
    const map = useMap();

    React.useEffect(() => {
      const handleClick = (e: any) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      };

      map.on('click', handleClick);

      return () => {
        map.off('click', handleClick);
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

  const handleLocationChange = (name: 'fromCity' | 'toCity', location: { lat: number, lng: number }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: location,
    }));
  };

  const onClickTrip = (routerPathEnum: RouterPathEnum, event: React.MouseEvent) => {
    event.preventDefault();
    const { title, fromCity, toCity, startDate, endDate, budget, description } = state;

    createTrip({ title, description, startDate, endDate, budget: +budget });

    navigate(routerPathEnum);
  };

  return (
    <>
      <div className="trip-page">
        <img className="background" src={require("src/assets/trip-background.ico")} />
        <div className="trip-all">
          <h1 className="trip-heading">We plan you travel</h1>
          <p className="trip-info">
            We understand that each traveler is unique, with different preferences, interests, and budgets. That's why we take pride in offering a personalized approach to travel planning. Whether you're seeking a luxurious beach getaway, an adrenaline-fueled adventure, or a cultural immersion, we are here to curate an experience that aligns with your aspirations.
          </p>
          <span className="trip-text-span">
            <form data-tab="search-1" className="search">
              <div className="search_dest">
                <label className="search__label">Choose your destination and preferences</label>
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
                  type="text"
                  name="fromCity"
                  placeholder="From City"
                  className="search__input"
                  autoComplete="off"
                  onChange={handleInputChange}
                  onClick={() => setFromCityModalIsOpen(true)}
                  value={state.fromCity.lat !== 0 && state.fromCity.lng !== 0 ? `Lat: ${state.fromCity.lat}, Lng: ${state.fromCity.lng}` : ""}
                />
                <Modal isOpen={fromCityModalIsOpen} onRequestClose={() => {
                  setFromCityModalIsOpen(false);
                  handleLocationChange('fromCity', { lat: fromCityMarkerPosition[0], lng: fromCityMarkerPosition[1] });
                }}>
                  <div style={{ height: '100vh', width: '100%' }}>
                    <MapContainer center={fromCityMarkerPosition} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                      <MapEvents setMarkerPosition={setFromCityMarkerPosition} />
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={fromCityMarkerPosition} icon={customMarkerIcon}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </Modal>
                <input
                  type="text"
                  name="toCity"
                  placeholder="To City"
                  className="search__input"
                  autoComplete="off"
                  onChange={handleInputChange}
                  onClick={() => setToCityModalIsOpen(true)}
                  value={state.toCity.lat !== 0 && state.toCity.lng !== 0 ? `Lat: ${state.toCity.lat}, Lng: ${state.toCity.lng}` : ""}
                />
                <Modal isOpen={toCityModalIsOpen} onRequestClose={() => {
                  setToCityModalIsOpen(false);
                  handleLocationChange('toCity', { lat: toCityMarkerPosition[0], lng: toCityMarkerPosition[1] });
                }}>
                  <div style={{ height: '100vh', width: '100%' }}>
                    <MapContainer center={toCityMarkerPosition} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                      <MapEvents setMarkerPosition={setToCityMarkerPosition} />
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={toCityMarkerPosition} icon={customMarkerIcon}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </Modal>
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
                <button className="btn" onClick={(e) => onClickTrip(RouterPathEnum.MEMBER, e)}>Save my info and see other ideas</button>
                <button className="btn" onClick={(e: React.MouseEvent) => onClickTrip(RouterPathEnum.MEMBER, e)}>See other's trip ideas</button>
              </div>
            </form>
          </span>
        </div>
      </div>
    </>
  );
};

export default CreateTrip;