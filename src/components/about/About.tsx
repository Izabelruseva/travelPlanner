import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/about/about.css";
import { loginUser, registerUser } from "src/requests/user";
import { notification } from 'antd';

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginEmail: string;
  loginPassword: string;
}

const About: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickJoin = async (routerPathEnum: RouterPathEnum) => {
    const { firstName, lastName, email, password } = state;
    const response = await registerUser({ email, password, firstName, lastName });

    if (response === 200) {
      notification.success({
        message: 'Login Successfull',
        description: 'You successfully logged in!'
      })
      navigate(routerPathEnum);
    }

    if (response === 400 || 401) {
      notification.error({
        message: 'Login Error',
        description: 'Invalid email or password. Please try again.',
      });
    } else if (response === 500) {
      notification.error({
        message: 'Server Error',
        description: 'An internal server error occurred. Please try again later.',
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'An error occurred during login. Please try again.',
      });
    }
  };

  const onClickSignIn = async (routerPathEnum: RouterPathEnum) => {
    const { loginEmail, loginPassword } = state;

    const response = await loginUser({ email: loginEmail, password: loginPassword });

    if (response === 200) {
      notification.success({
        message: 'Registration Successfull',
        description: 'You successfully registered!'
      })
      navigate(routerPathEnum);
    }

    if (response === 400 || response === 401) {
      notification.error({
        message: 'Login Error',
        description: 'Invalid email or password. Please try again.',
      });
    } else if (response === 500) {
      notification.error({
        message: 'Server Error',
        description: 'An internal server error occurred. Please try again later.',
      });
    } else {
      notification.error({
        message: 'Error',
        description: 'An error occurred during login. Please try again.',
      });
    }
  };

  return (
    <div className="about-page">
      <img
        className="background"
        src={require("src/assets/about-background.ico")}
        alt="Background"
      />
      <div className="about-all">
        <h2 className="about-heading">
          We are happy to have you interested in becoming part of our team
        </h2>
        <span className="about-text-span">
          <p className="about-text">
            Join us on this exciting journey as we unlock the world's hidden
            treasures and share our passion for travel with you. Together,
            let's create memories that will last a lifetime and embark on
            extraordinary adventures that will leave a lasting impact. Welcome
            to our travel community, where dreams are turned into reality.
          </p>
        </span>
        <span className="login-forms">
          <form data-tab="credentials" className="credentials">
            <div>
              <label htmlFor="firstName" className="name__label">
                What is your name?
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                className="input"
                autoComplete="off"
                value={state.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                className="input"
                autoComplete="off"
                value={state.lastName}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="name__label">
                What is your email?
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="yourEmail@mail.com"
                className="input"
                autoComplete="off"
                value={state.email}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="password-label">
                Choose a password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="*******"
                className="input"
                autoComplete="off"
                value={state.password}
                onChange={handleInputChange}
              />
              <button
                className="btn"
                onClick={() => onClickJoin(RouterPathEnum.TRIPS)}
              >
                Join me!😊
              </button>
            </div>
          </form>
          <form data-tab="credentials" className="credentials">
            <div>
              <label htmlFor="loginEmail" className="name__label">
                Already have an account? Sign in:
              </label>
              <input
                type="email"
                id="loginEmail"
                name="loginEmail"
                placeholder="yourEmail@mail.com"
                className="input"
                autoComplete="off"
                value={state.loginEmail}
                onChange={handleInputChange}
              />
              <input
                type="password"
                id="loginPassword"
                name="loginPassword"
                placeholder="*******"
                className="input"
                autoComplete="off"
                value={state.loginPassword}
                onChange={handleInputChange}
              />
              <button
                className="btn"
                onClick={() => onClickSignIn(RouterPathEnum.TRIPS)}
              >
                Sign in!😎
              </button>
            </div>
          </form>
          <button className="btn" onClick={() => window.history.back()}>
            Go to the home page to know more about us✈
          </button>
        </span>
      </div>
    </div>
  );
};

export default About; 