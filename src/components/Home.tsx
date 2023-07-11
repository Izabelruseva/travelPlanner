import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "../enums/RouterPathEnum";

import "src/components/home.css";

import { registerUser } from "src/requests/user";

class Home extends React.Component<RouteComponentProps<Home>, {}> {
  constructor(props: RouteComponentProps<Home>) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="page-home">
          <img className="background" src={require("src/backgroundHome.ico")} />
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
                onClick={(e: any) => this.onClickMove(RouterPathEnum.ABOUT)}
              >
                sign up
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="btn"
                onClick={(e: any) => this.onClickMove(RouterPathEnum.ABOUT)}
              >
                log in
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="btn"
                onClick={(e: any) => this.onClickMove(RouterPathEnum.MEMBER)}
              >
                See trip ideas
              </button>
            </span>
            <span>
              <div className="info">Who we are</div>
              <p className="info-text">
                We are a passionate team of travel enthusiasts, driven by our
                love for exploration and our desire to make travel planning an
                effortless and enjoyable experience for everyone. With years of
                collective experience in the travel industry, we have
                established ourselves as a reliable source of inspiration and
                guidance for travelers worldwide.
              </p>
              <p className="info-text">
                Welcome to our travel planner website, where your dream
                destinations become a reality. Whether you're an avid explorer
                seeking new adventures or a leisure traveler in search of
                relaxation, our platform is here to simplify and enhance your
                travel experience. With a vast array of meticulously curated
                itineraries, insider tips, and personalized recommendations, we
                are dedicated to helping you create unforgettable journeys
                tailored to your unique preferences. From discovering hidden
                gems in exotic locations to planning seamless logistics for your
                trips, we're your trusted companion every step of the way. Get
                ready to embark on a world of possibilities and let us guide you
                towards extraordinary travel experiences. Start planning your
                next adventure with us today!
              </p>
            </span>
          </p>
        </div>
      </>
    );
  }

  private onClickMove = (routerPathEnum: RouterPathEnum) => {
    registerUser({
      firstName: "Kaloyan",
      lastName: "Dimitrov",
      password: "123",
      email: "test@test.bg",
    });
    this.props.history.push(routerPathEnum);
  };
}

export default Home;
