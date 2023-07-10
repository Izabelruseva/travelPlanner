import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";

class CreateTrip extends React.Component<RouteComponentProps<CreateTrip>, {}> {
  constructor(props: RouteComponentProps<CreateTrip>) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="trip-page">
          <div className="trip-all">
            <h1 className="trip-heading">We plan you travel</h1>
            <span className="trip-text-span">
              <p className="trip-text">Choose your destination</p>
              <form data-tab="search-1" className="search">
                <div className="search_dest">
                  <label className="search__label">
                    Where do you want to go?
                  </label>
                  <input
                    type="text"
                    placeholder="From:"
                    className="search__input search_input_from"
                    autoComplete="on"
                  />
                  <input
                    type="text"
                    placeholder="To:"
                    className="search__input search_input_from"
                    autoComplete="on"
                  />

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
