import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/about/about.css";
import { loginUser, registerUser } from "src/requests/user";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginEmail: string;
  loginPassword: string;
}

class About extends React.Component<RouteComponentProps<About>, State> {
  constructor(props: RouteComponentProps<About>) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loginEmail: '',
      loginPassword: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

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
                  name="firstName"
                  placeholder="First name"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <label className="name__label">What is your email?</label>
                <input
                  type="email"
                  name="email"
                  placeholder="yourEmail@mail.com"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <label className="password-label">Choose a password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="*******"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <button
                  className="btn"
                  onClick={(e: any) => this.onClickJoin(RouterPathEnum.MEMBER)}
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
                  name="loginEmail"
                  placeholder="yourEmail@mail.com"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <input
                  type="password"
                  name="loginPassword"
                  placeholder="*******"
                  className="input"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <button
                  className="btn"
                  onClick={(e: any) => this.onClickSignIn(RouterPathEnum.MEMBER)}
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
  private onClickJoin = (routerPathEnum: RouterPathEnum) => {
    const { firstName, lastName, email, password } = this.state;

    registerUser({ email, password, firstName, lastName });

    this.props.history.push(routerPathEnum);
  };

  private onClickSignIn = (routerPathEnum: RouterPathEnum) => {
    const { loginEmail, loginPassword } = this.state;

    loginUser({ email: loginEmail, password: loginPassword });

    this.props.history.push(routerPathEnum);
  };
}

export default About;