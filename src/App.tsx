import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/Home";
import About from "./components/about/About";
import HeaderSmall from "./components/header/HeaderSmall";
import CreateTrip from "./components/trip/CreateTrip";
import { RouterPathEnum } from "./enums/RouterPathEnum";
import Members from "./components/member/Members";
import { getUserProfile } from "./requests/user";

interface IState {
  isSmallScreen: boolean;
  isAuthenticated: boolean | null;
}

class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isSmallScreen: false,
      isAuthenticated: null,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    this.updateDimensions(null);

    this.checkAuthentication();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  private updateDimensions = (e: any) => {
    this.setState({ isSmallScreen: window.innerWidth < 500 });
  };

  private checkAuthentication = async () => {
    try {
      const userProfile = await getUserProfile();

      if (userProfile !== 0) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  };

  public render() {
    const { isAuthenticated } = this.state;

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    return (
      <BrowserRouter>
        <div>
          {this.state.isSmallScreen ? <HeaderSmall /> : <Header />}
          <Routes>
            <Route path={RouterPathEnum.HOME} element={<Home />} />
            <Route path={RouterPathEnum.ABOUT} element={<About />} />
            <Route path={RouterPathEnum.MEMBER} element={<Members />} />

            {isAuthenticated ? (
              <Route path={RouterPathEnum.CREATE_TRIP} element={<CreateTrip />} />
            ) : (
              <Route
                path={RouterPathEnum.CREATE_TRIP}
                element={<Navigate to={RouterPathEnum.ABOUT} replace />}
              />
            )}

            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;