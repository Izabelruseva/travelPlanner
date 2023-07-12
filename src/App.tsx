import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/Home";
import About from "./components/about/About";
import HeaderSmall from "./components/header/HeaderSmall";
import CreateTrip from "./components/trip/CreateTrip";
import { RouterPathEnum } from "./enums/RouterPathEnum";
import Members from "./components/member/Members";
import { withAuth } from "./components/auth/Auth";
import tripModal from "./components/tripModal/tripModal";
import useModal from "./components/tripModal/useModal";

interface IState {
  isSmallScreen: boolean;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = { isSmallScreen: false };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    this.updateDimensions(null);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  private updateDimensions = (e: any) => {
    this.setState({ isSmallScreen: window.innerWidth < 500 });
  };

  public render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.isSmallScreen ? <HeaderSmall /> : <Header />}
          <Switch>
            <Route exact={true} path={RouterPathEnum.HOME} component={Home} />
            <Route path={RouterPathEnum.ABOUT} component={About} />
            <Route path={RouterPathEnum.MEMBER} component={Members} />
            <Route
              path={RouterPathEnum.CREATE_TRIP}
              component={withAuth(CreateTrip)}
            />
            <Route path={RouterPathEnum.MODAL} component={tripModal} />
            <Redirect to={RouterPathEnum.HOME} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
