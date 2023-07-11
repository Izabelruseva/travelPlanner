import * as React from "react";
import { RouteComponentProps, Switch, Route } from "react-router";
import MemberModel from "../../models/MemberModel";
import { Link } from "react-router-dom";
import { RouterPathEnum } from "../../enums/RouterPathEnum";
import Member from "./Member";
import "src/components/member/member.css";
import "src/components/member/pics/1.ico";
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
    const arrMembers: MemberModel[] = [];

    arrMembers.push(new MemberModel(0, "Trip to Varna"));
    arrMembers.push(new MemberModel(1, "Trip to Stara Zagora"));
    arrMembers.push(new MemberModel(2, "Trip to Ruse"));

    return arrMembers;
  };

  private getMemberModelFromUrl = (): MemberModel | null => {
    // i don't know how to get only :id. so..
    const strId: string = this.props.location.pathname.split(
      this.props.match.path + "/"
    )[1];

    return this.getMemberModelById(this.state.memberModelList, Number(strId));
  };

  private getMemberModelById = (
    arr: MemberModel[],
    nId: number
  ): MemberModel | null => {
    var memberModel: MemberModel;

    for (var i: number = 0; i < arr.length; ++i) {
      memberModel = arr[i];
      if (memberModel.getId() === nId) {
        return memberModel;
      }
    }

    return null;
  };

  render() {
    const { firstName } = this.state;
    return (
      <>
        <div className="members-page">
          <img
            className="background"
            src={require("src/components/member/pics/background.ico")}
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
                <img src={require("src/components/member/pics/1.ico")} />
                <img src={require("src/components/member/pics/2.ico")} />
                <img src={require("src/components/member/pics/4.ico")} />
              </span>
            </span>
            <span className="span-links">
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
