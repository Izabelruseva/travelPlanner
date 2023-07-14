import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import { getUserProfile } from "src/requests/user";
import Modal from "react-modal";
import "../../components/trip/tripList.css";
import { getAllTrips, likeTrip } from "src/requests/trip";
import { Trip } from "src/requests/trip";
import { Image } from "src/requests/image";
import { Destination } from "src/requests/destination";
import "src/components/trip/tripList.css";

const Trips: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const location = useLocation();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [tripList, setTripList] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setFirstName(profile.firstName);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchTrips = async () => {
      try {
        const trips = await getAllTrips();
        setTripList(trips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchUserProfile();
    fetchTrips();
  }, []);

  const handleButtonClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getTripFromUrl = (): Trip | null => {
    const strId: string = location.pathname.split(
      RouterPathEnum.TRIPS + "/"
    )[1];
    return getTripById(Number(strId));
  };

  const getTripById = (nId: number): Trip | null => {
    return tripList.find((trip) => trip.id === nId) || null;
  };

  return (
    <div className="trips-page">
      <img
        className="background"
        src={require("src/assets/member-background.ico")}
      />
      <div className="welcome-message">
        Welcome back, {firstName ? firstName : "Loading..."}
      </div>

      <div className="trips-all">
        <h2 className="trips-heading">
          You’re always a short detour from an Extraordinary Place
        </h2>
        <span className="trips-span">
          <p className="trips-text">
            Our collection of more than 300 Extraordinary Places will take your
            trip to the next level. Look for the illustrations on our maps and
            read our takes on what make these places so special. We’ve been
            there, and we think you should go, too.
          </p>
        </span>

        <span className="span">
          <span className="span-img">
            <img src={require("src/assets/1.ico")} alt="Image 1" />
            <img src={require("src/assets/2.ico")} alt="Image 2" />
            <img src={require("src/assets/4.ico")} alt="Image 4" />
          </span>
        </span>

        <span className="span-img">
          {tripList.map((trip) => (
            <button
              key={trip.id}
              onClick={() => handleButtonClick(trip)}
              className="pic-btn"
            >
              <p className="trips-text">{trip.title}</p>
              {trip.images && trip.images.length > 0 ? (
                <img
                  className="pics"
                  src={`data:image/jpeg;base64,${trip.images[0].base64}`}
                  alt={trip.title}
                />
              ) : (
                <img
                  className="pics"
                  src={require("src/assets/about-background.ico")}
                  alt={trip.title}
                />
              )}
            </button>
          ))}

          <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
            <div className="modal-container">
              <div className="modal-content">
                <p>{selectedTrip?.id}</p>
                <p className="modal-text" id="ModalTitle">
                  {selectedTrip?.title}
                </p>
                <p className="modal-text" id="ModalDesc">
                  {selectedTrip?.description}
                </p>
                <p className="modal-text" id="budget">
                  {selectedTrip?.budget}
                </p>
                <p className="modal-text" id="fromToDate">
                  From: {selectedTrip?.startDate} - {selectedTrip?.endDate}
                </p>

                <img
                  className="modal-content-img"
                  src={require("src/assets/about-background.ico")}
                  alt="Instagram Post"
                />
                <button className="close-button" onClick={handleCloseModal}>
                  &times;
                </button>
                <button
                  className="like-button"
                  onClick={() =>
                    selectedTrip && selectedTrip.id && likeTrip(selectedTrip.id)
                  }
                >
                  ❤️
                </button>
              </div>
            </div>
          </Modal>
        </span>
      </div>
    </div>
  );
};

export default Trips;
