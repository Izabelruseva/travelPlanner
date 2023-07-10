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
      <div className="page-home">
        <p className="home-all">
          <h2 className="home-heading">
            Hi there, are you ready to start a new adventure?
          </h2>
          <span className="home-text-span">
            <p className="home-text">To begin log in </p>
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
        </p>
      </div>
    );
  }

  private onClickMove = (routerPathEnum: RouterPathEnum) => {
    registerUser({ firstName: "Kaloyan", lastName: "Dimitrov", password: "123", email: "test@test.bg" });
    this.props.history.push(routerPathEnum);
  };
}

export default Home;
