import * as React from "react";
import { RouteComponentProps } from "react-router";
import { RouterPathEnum } from "src/enums/RouterPathEnum";
import "src/components/trip/style.css";
import { Trip, createTrip } from "src/requests/trip";
import { create } from "domain";

interface ITrip {
  title: string;
  fromCity: string;
  toCity: string;
  startDate: string;
  endDate: string;
  budget: number;
  description: string;
}

class CreateTrip extends React.Component<RouteComponentProps<CreateTrip>, ITrip> {
  constructor(props: RouteComponentProps<CreateTrip>) {
    super(props);
    this.state = {
      title: "",
      fromCity: "",
      toCity: "",
      startDate: "",
      endDate: "",
      budget: 0,
      description: "",
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name as keyof ITrip]: value
    }));
  };

  private onClickTrip = async (routerPathEnum: RouterPathEnum, event: React.MouseEvent) => {
    event.preventDefault();
    const { title, fromCity, toCity, startDate, endDate, budget, description } = this.state;

    createTrip({ title, description, startDate, endDate, budget: +budget });

    this.props.history.push(routerPathEnum);
  };

  render() {
    return (
      <>
        <div className="trip-page">
          <img className="background" src={require("src/assets/trip-background.ico")} />
          <div className="trip-all">
            <h1 className="trip-heading">We plan you travel</h1>
            <p className="trip-info">
              We understand that each traveler is unique, with different preferences, interests, and budgets. That's why we take pride in offering a personalized approach to travel planning. Whether you're seeking a luxurious beach getaway, an adrenaline-fueled adventure, or a cultural immersion, we are here to curate an experience that aligns with your aspirations.
            </p>
            <span className="trip-text-span">
              <form data-tab="search-1" className="search">
                <div className="search_dest">
                  <label className="search__label">Choose your destination and preferences</label>
                  <input type="text" name="title" placeholder="Trip To Dubai" className="search__input " autoComplete="off" onChange={this.handleInputChange} />
                  <input type="text" name="fromCity" placeholder="From: city🏡" className="search__input " autoComplete="off" onChange={this.handleInputChange} />
                  <input type="text" name="toCity" placeholder="To: city🚩" className="search__input " autoComplete="off" onChange={this.handleInputChange} />
                  <input type="date" name="startDate" placeholder="Start date" className="search__input " autoComplete="on" onChange={this.handleInputChange} />
                  <input type="date" name="endDate" placeholder="End date" className="search__input " autoComplete="on" onChange={this.handleInputChange} />
                  <input type="number" name="budget" placeholder="Max budget..." className="search__input" autoComplete="off" onChange={this.handleInputChange} />
                  <input type="text" name="description" placeholder="Add description..." className="search__input" autoComplete="off" onChange={this.handleInputChange} />
                  <button className="btn" onClick={(e) => this.onClickTrip(RouterPathEnum.MEMBER, e)}>Save my info and see other ideas</button>
                  <button className="btn" onClick={(e: any) => this.onClickTrip(RouterPathEnum.MEMBER, e)}>See other's trip ideas</button>
                </div>
              </form>
            </span>
          </div>
        </div>
      </>
    );
  }
}
export default CreateTrip;
