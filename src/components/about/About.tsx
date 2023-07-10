import * as React from "react";
import { RouteComponentProps } from "react-router";
import "src/components/about/about.css";

class About extends React.Component<RouteComponentProps<About>, {}> {
  constructor(props: RouteComponentProps<About>) {
    super(props);
  }

  render() {
    return (
      <div className="about-page">
        <div className="about-all">
          <h2 className="about-heading">
            We are happy to have you interested in becoming part of our team
          </h2>
          <span className="about-text-span">
            <p className="about-text">
              You are a few steps away from starting the experience
            </p>
          </span>
          <span className="about-text-span">
            <p className="about-text">
              Turn your road trip into an adventure.By becoming part of our
              family you will be able to save ideas for your future trip{" "}
            </p>
          </span>

          <span className="about-text-span">
            <form data-tab="credentials" className="credentials">
              <div className="name">
                <label className="name__label">What is your name?</label>
                <input type="text" className="name-input" autoComplete="off" />
                <label className="password-label">Choose a password</label>
                <input
                  type="password"
                  placeholder="*******"
                  className="password-input"
                  autoComplete="off"
                />
                <button className="btn">Join me!😊</button>
              </div>
              <button
                className="btn"
                onClick={(e: any) => this.props.history.goBack()}
              >
                Go to home page to know more about us✈
              </button>
            </form>
          </span>
          <form className="login">
            <label className="search__label">Enter your name</label>
            <input
              type="name"
              className="name-input"
              autoCapitalize="off"
              autoComplete="off"
              placeholder="First Name"
            />
            <label className="search__label">Password</label>
            <input
              type="password"
              className="pass-input"
              autoCapitalize="off"
              autoComplete="off"
              placeholder="********"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default About;
