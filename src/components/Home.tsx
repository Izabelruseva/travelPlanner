import * as React from "react";
import { useNavigate } from "react-router-dom";
import { RouterPathEnum } from "../enums/RouterPathEnum";

import "src/components/home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onClickMove = (routerPathEnum: RouterPathEnum) => {
    navigate(routerPathEnum);
  };

  return (
    <>
      <div className="page-home">
        <img className="background" src={require("src/assets/home-background.ico")} />
        <p className="home-all">
          <h2 className="home-heading">
            Hi there, are you ready to start a new adventure?
          </h2>
          <span className="home-text-span">
            <p className="home-text">
              To begin log in or create new account{" "}
            </p>
            <button
              className="btn"
              onClick={() => onClickMove(RouterPathEnum.ABOUT)}
            >
              sign up
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn"
              onClick={() => onClickMove(RouterPathEnum.ABOUT)}
            >
              log in
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn"
              onClick={() => onClickMove(RouterPathEnum.MEMBER)}
            >
              See trip ideas
            </button>
          </span>
          <span>
            <div className="info">Welcome</div>
            <p className="info-text">
              To our travel planner website, where your dream destinations
              become a reality. Whether you're an avid explorer seeking new
              adventures or a leisure traveler in search of relaxation, our
              platform is here to simplify and enhance your travel experience.
              With a vast array of meticulously curated itineraries, insider
              tips, and personalized recommendations, we are dedicated to
              helping you create unforgettable journeys tailored to your
              unique preferences. From discovering hidden gems in exotic
              locations to planning seamless logistics for your trips, we're
              your trusted companion every step of the way. Get ready to
              embark on a world of possibilities and let us guide you towards
              extraordinary travel experiences. Start planning your next
              adventure with us today!
            </p>
            <div className="info">Who we are</div>
            <p className="info-text">
              We are a passionate team of travel enthusiasts, driven by our
              love for exploration and our desire to make travel planning an
              effortless and enjoyable experience for everyone. With years of
              collective experience in the travel industry, we have
              established ourselves as a reliable source of inspiration and
              guidance for travelers worldwide.
            </p>
          </span>
        </p>
      </div>
    </>
  );
};

export default Home;  