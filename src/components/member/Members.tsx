import * as React from "react";
import { RouteComponentProps, Switch, Route } from "react-router";
import MemberModel from "../../models/MemberModel";
import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import Member from "./Member";
import "src/components/member/member.css";
import { getUserProfile } from "src/requests/user";

interface IState {
  memberModelList: MemberModel[];
  firstName: string | null;
}

class Members extends React.Component<RouteComponentProps<Members>, IState> {
  constructor(props: RouteComponentProps<Members>) {
    super(props);

    this.state = {
      memberModelList: this.makeSampleMemberModels(),
      firstName: null,
    };
  }

  async componentDidMount() {
    try {
      const profile = await getUserProfile();
      this.setState({ firstName: profile.firstName });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  }

  private makeSampleMemberModels = (): MemberModel[] => {
    return ["Trip to Varna", "Trip to Stara Zagora", "Trip to Ruse"].map(
      (trip, index) => new MemberModel(index, trip)
    );
  };

  private getMemberModelFromUrl = (): MemberModel | null => {
    const strId: string = this.props.location.pathname.split(
      this.props.match.path + "/"
    )[1];

    return this.getMemberModelById(Number(strId));
  };

  private getMemberModelById = (nId: number): MemberModel | null => {
    const { memberModelList } = this.state;

    return memberModelList.find((model) => model.getId() === nId) || null;
  };

  render() {
    const { firstName } = this.state;
    return (
      <>
        <div className="members-page">
          <img
            className="background"
            src={require("src/assets/member-background.ico")}
          />
          <div className="welcome-message">
            Welcome back, {firstName ? firstName : "Loading..."}
          </div>

          <div className="members-all">
            <h2 className="members-heading">
              You’re always a short detour from an Extraordinary Place
            </h2>
            <span className="members-span">
              <p className="members-text">
                Our collection of more than 300 Extraordinary Places will take
                your trip to the next level. Look for the illustrations on our
                maps and read our takes on what make these places so special.
                We’ve been there, and we think you should go, too.
              </p>
            </span>

            <span className="span">
              <span className="span-img">
                <img src={require("src/assets/1.ico")} />
                <img src={require("src/assets/2.ico")} />
                <img src={require("src/assets/4.ico")} />
              </span>
            </span>
            <span className="span-links">
              <button className="btn">show modal</button>

              <ul className="links-all">
                {this.state.memberModelList.map(
                  (model: MemberModel, idx: number) => {
                    return (
                      <li className="links" key={idx}>
                        <Link to={this.props.match.url + "/" + idx}>
                          {model.getName()}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
              <Switch>
                <Route exact={true} path={RouterPathEnum.MEMBER} />
                <Route
                  path={this.props.match.url + "/:id"}
                  render={(props) => (
                    <Member
                      {...props}
                      memberModel={this.getMemberModelFromUrl()}
                    />
                  )}
                />
              </Switch>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Members;
