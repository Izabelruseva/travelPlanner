import * as React from "react";
import { useLocation } from "react-router-dom";
import MemberModel from "../../models/MemberModel";
import { Link, Routes, Route } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import Member from "./Member";
import "src/components/member/member.css";
import { getUserProfile } from "src/requests/user";

interface IState {
  memberModelList: MemberModel[];
  firstName: string | null;
}

const Members: React.FC = () => {
  const location = useLocation();
  const [state, setState] = React.useState<IState>({
    memberModelList: [],
    firstName: null,
  });

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setState((prevState) => ({
          ...prevState,
          firstName: profile.firstName,
        }));
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const makeSampleMemberModels = (): MemberModel[] => {
      return ["Trip to Varna", "Trip to Stara Zagora", "Trip to Ruse"].map(
        (trip, index) => new MemberModel(index, trip)
      );
    };

    setState((prevState) => ({
      ...prevState,
      memberModelList: makeSampleMemberModels(),
    }));

    fetchUserProfile();
  }, []);

  const getMemberModelFromUrl = (): MemberModel | null => {
    const strId: string = location.pathname.split(
      RouterPathEnum.MEMBER + "/"
    )[1];

    return getMemberModelById(Number(strId));
  };

  const getMemberModelById = (nId: number): MemberModel | null => {
    const { memberModelList } = state;

    return memberModelList.find((model) => model.getId() === nId) || null;
  };

  const { firstName, memberModelList } = state;

  return (
    <>
      <div className="members-page">
        <img
          className="background"
          src={require("src/assets/member-background.ico")}
        />
        <div className="welcome-message">
          Welcome back, {firstName ? firstName : "Loading..."}
        </div>

        <div className="members-all">
          <h2 className="members-heading">
            You’re always a short detour from an Extraordinary Place
          </h2>
          <span className="members-span">
            <p className="members-text">
              Our collection of more than 300 Extraordinary Places will take
              your trip to the next level. Look for the illustrations on our
              maps and read our takes on what make these places so special.
              We’ve been there, and we think you should go, too.
            </p>
          </span>

          <span className="span">
            <span className="span-img">
              <img src={require("src/assets/1.ico")} />
              <img src={require("src/assets/2.ico")} />
              <img src={require("src/assets/4.ico")} />
            </span>
          </span>
          <span className="span-links">
            <button className="btn">show modal</button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Members;
