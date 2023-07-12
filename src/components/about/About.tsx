import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const About: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = React.useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onClickJoin = async (routerPathEnum: RouterPathEnum) => {
    const { firstName, lastName, email, password } = state;

    console.log(await registerUser({ email, password, firstName, lastName }));

    navigate(routerPathEnum);
  };

  const onClickSignIn = async (routerPathEnum: RouterPathEnum) => {
    const { loginEmail, loginPassword } = state;

    await loginUser({ email: loginEmail, password: loginPassword });

    navigate(routerPathEnum);
  };

  return (
    <div className="about-page">
      <img
        className="background"
        src={require("src/assets/about-background.ico")}
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
              <label className="name__label">What is your name?</label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="input"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="input"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <label className="name__label">What is your email?</label>
              <input
                type="email"
                name="email"
                placeholder="yourEmail@mail.com"
                className="input"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <label className="password-label">Choose a password</label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                className="input"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button
                className="btn"
                onClick={(e: any) => onClickJoin(RouterPathEnum.MEMBER)}
              >
                Join me!😊
              </button>
            </div>
          </form>
          &nbsp;&nbsp;&nbsp;&nbsp;
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
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="loginPassword"
                placeholder="*******"
                className="input"
                autoComplete="off"
                onChange={handleInputChange}
              />
              <button
                className="btn"
                onClick={(e: any) =>
                  onClickSignIn(RouterPathEnum.MEMBER)
                }
              >
                Sign in!😎
              </button>
            </div>
          </form>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn"
            onClick={(e: any) => history.back()}
          >
            Go to home page to know more about us✈
          </button>
        </span>
      </div>
    </div>
  );
};

export default About;