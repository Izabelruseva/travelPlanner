import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";

interface State {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loginEmail: string;
  loginPassword: string;
}

class CreateTrip extends React.Component<RouteComponentProps<CreateTrip>, {}> {
  constructor(props: RouteComponentProps<CreateTrip>) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="trip-page">
          <img
            className="background"
            src={require("src/assets/trip-background.ico")}
          />
          <div className="trip-all">
            <h1 className="trip-heading">We plan you travel</h1>
            <p className="trip-info">
              We understand that each traveler is unique, with different
              preferences, interests, and budgets. That's why we take pride in
              offering a personalized approach to travel planning. Whether
              you're seeking a luxurious beach getaway, an adrenaline-fueled
              adventure, or a cultural immersion, we are here to curate an
              experience that aligns with your aspirations.
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="trip-text-span">
              <form data-tab="search-1" className="search">
                <div className="search_dest">
                  <label className="search__label">
                    Choose your destination and preferences
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="fromCity"
                    placeholder="From: city🏡"
                    className="search__input "
                    autoComplete="on"
                  />
                  <input
                    type="text"
                    placeholder="To: city🚩"
                    className="search__input "
                    autoComplete="on"
                  />
                  <input
                    type="date"
                    placeholder="Start date"
                    className="search__input "
                    autoComplete="on"
                  />
                  <input
                    type="date"
                    placeholder="End date"
                    className="search__input "
                    autoComplete="on"
                  />
                  <input
                    type="number"
                    placeholder="Max budget..."
                    className="search__input"
                    autoComplete="on"
                  />
                  <input
                    type="text"
                    placeholder="Add description..."
                    className="search__input"
                    autoComplete="off"
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button className="btn">Save my info</button>
                  <button
                    className="btn"
                    onClick={(e: any) =>
                      this.onClickMove(RouterPathEnum.MEMBER)
                    }
                  >
                    See other's trip ideas
                  </button>
                </div>
              </form>
            </span>
          </div>
        </div>
      </>
    );
  }
  private onClickMove = (routerPathEnum: RouterPathEnum) => {
    this.props.history.push(routerPathEnum);
  };
}
export default CreateTrip;
