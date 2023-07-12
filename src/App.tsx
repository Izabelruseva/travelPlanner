import * as React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/Home";
import About from "./components/about/About";
import HeaderSmall from "./components/header/HeaderSmall";
import CreateTrip from "./components/trip/CreateTrip";
import { RouterPathEnum } from "./enums/RouterPathEnum";
import Members from "./components/member/Members";

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
          <Routes>
            <Route path={RouterPathEnum.HOME} element={<Home />} />
            <Route path={RouterPathEnum.ABOUT} element={<About />} />
            <Route path={RouterPathEnum.MEMBER} element={<Members />} />
            <Route path={RouterPathEnum.CREATE_TRIP} element={<CreateTrip />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;