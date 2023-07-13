import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MemberModel from "../../models/MemberModel";
import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import { getUserProfile } from "src/requests/user";
import Modal from "react-modal";
import "../../components/member/member.css";

interface Trip {
  ModalTitle: string;
  ModalDesc: string;
  budget: string;
  fromToDate: number;
}

const Members: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [memberModelList, setMemberModelList] = useState<MemberModel[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setFirstName(profile.firstName);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const makeSampleMemberModels = (): MemberModel[] => {
      return ["Trip to Varna", "Trip to Stara Zagora", "Trip to Ruse"].map(
        (trip, index) => new MemberModel(index, trip)
      );
    };

    setMemberModelList(makeSampleMemberModels());
    fetchUserProfile();
  }, []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getMemberModelFromUrl = (): MemberModel | null => {
    const strId: string = location.pathname.split(RouterPathEnum.MEMBER + "/")[1];
    return getMemberModelById(Number(strId));
  };

  const getMemberModelById = (nId: number): MemberModel | null => {
    return memberModelList.find((model) => model.getId() === nId) || null;
  };

  return (
    <div className="members-page">
      <img className="background" src={require("src/assets/member-background.ico")} />
      <div className="welcome-message">
        Welcome back, {firstName ? firstName : "Loading..."}
      </div>

      <div className="members-all">
        <h2 className="members-heading">
          You’re always a short detour from an Extraordinary Place
        </h2>
        <span className="members-span">
          <p className="members-text">
            Our collection of more than 300 Extraordinary Places will take your trip to the next level.
            Look for the illustrations on our maps and read our takes on what make these places so special.
            We’ve been there, and we think you should go, too.
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
          <button onClick={handleButtonClick} className="pic-btn">
            <p className="members-text">Trip to Varna</p>
            <img
              className="pics"
              src={require("src/assets/about-background.ico")}
              alt="Trip to Varna"
            />
          </button>

          <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
            <div className="modal-container">
              <div className="modal-content">
                <p className="modal-text" id="ModalTitle">
                  Title
                </p>
                <p className="modal-text" id="ModalDesc">
                  Description
                </p>
                <p className="modal-text" id="budget">
                  Budget
                </p>
                <p className="modal-text" id="fromToDate">
                  From: To:
                </p>

                <img
                  className="modal-content-img"
                  src={require("src/assets/about-background.ico")}
                  alt="Instagram Post"
                />
                <button className="close-button" onClick={handleCloseModal}>
                  &times;
                </button>
                <button className="like-button">&#10084;</button>
              </div>
            </div>
          </Modal>
        </span>
      </div>
    </div>
  );
};

export default Members;