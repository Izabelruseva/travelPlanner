import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/about/about.css";

class About extends React.Component<RouteComponentProps<About>, {}> {
  constructor(props: RouteComponentProps<About>) {
    super(props);
  }

  render() {
    return (
      <div className="about-page">
        <img
          className="background"
          src={require("src/components/about/picsAbout/background.ico")}
        />
        <div className="about-all">
          <h2 className="about-heading">
            We are happy to have you interested in becoming part of our team
          </h2>
          <span className="about-text-span">
            <p className="about-text">
              You are a few steps away from starting the experience
            </p>
            <p className="about-text">
              Turn your road trip into an adventure.By becoming part of our
              family you will be able to save ideas for your future trip{" "}
            </p>
          </span>
          <span className="about-text-span">
            <form data-tab="credentials" className="credentials">
              <div>
                <label className="name__label">What is your name?</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First name"
                  className="input"
                  autoComplete="off"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="input"
                  autoComplete="off"
                />
                <label className="name__label">What is your email?</label>
                <input
                  type="email"
                  placeholder="yourEmail@mail.com"
                  className="input"
                  autoComplete="off"
                />
                <label className="password-label">Choose a password</label>
                <input
                  type="password"
                  placeholder="*******"
                  className="input"
                  autoComplete="off"
                />
                <button
                  className="btn"
                  onClick={(e: any) => this.onClickbtn(RouterPathEnum.MEMBER)}
                >
                  Join me!😊
                </button>
              </div>
            </form>
            <form data-tab="credentials" className="credentials">
              <div>
                <label className="name__label">
                  Already have an account? Sign in:
                </label>
                <input
                  type="email"
                  placeholder="yourEmail@mail.com"
                  className="input"
                  autoComplete="off"
                />
                <input
                  type="password"
                  placeholder="*******"
                  className="input"
                  autoComplete="off"
                />
                <button
                  className="btn"
                  onClick={(e: any) => this.onClickbtn(RouterPathEnum.MEMBER)}
                >
                  Join me!😊
                </button>
              </div>
            </form>

            <button
              className="btn"
              onClick={(e: any) => this.props.history.goBack()}
            >
              Go to home page to know more about us✈
            </button>
          </span>
        </div>
      </div>
    );
  }
  private onClickbtn = (routerPathEnum: RouterPathEnum) => {
    this.props.history.push(routerPathEnum);
    console.log(`("name").value`);
  };
}

export default About;
