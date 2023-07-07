import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import MemberModel from '../../models/MemberModel';
import { Link } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';
import Member from './Member';
import 'src/components/member/member.css'

interface IState {
    memberModelList: MemberModel[];
}

class Members extends React.Component<RouteComponentProps<Members>, IState> {
  constructor(props : RouteComponentProps<Members>){
    super(props);

    this.state = { memberModelList: this.makeSampleMemberModels() };
  }

  private makeSampleMemberModels = (): MemberModel[] => {
      const arrMembers: MemberModel[] = [];
      
      arrMembers.push( new MemberModel( 0, 'Trip to Varna' ) );
      arrMembers.push( new MemberModel( 1, 'Trip to Stara Zagora' ) );
      arrMembers.push( new MemberModel( 2, 'Trip to Ruse' ) );

      return arrMembers;
  }

  private getMemberModelFromUrl = (): MemberModel | null =>  {
      // i don't know how to get only :id. so..
      const strId: string = this.props.location.pathname.split( this.props.match.path + '/' )[1];
      
      return this.getMemberModelById( this.state.memberModelList, Number( strId ) );
  }

  private getMemberModelById = ( arr: MemberModel[], nId: number ): MemberModel | null => {
      var memberModel: MemberModel;
    
      for(var i: number=0; i<arr.length; ++i) {
        memberModel = arr[ i ];
        if( memberModel.getId() === nId ) {
            return memberModel;
        }
      }

      return null;
  }

  render() {
    return(
      <div className='members-page'>
        <h2 className='members-heading'>See what other experienced:</h2>
        <ul className='links-all'>
        { this.state.memberModelList.map( ( model: MemberModel, idx: number ) => {
            return ( 
                <li className='links' key={ idx }>
                    <Link to={ this.props.match.url + '/' + idx }>
                        { model.getName() }
                    </Link>
                </li>
             );
        } ) }
        </ul>
        <Switch>
            <Route exact={true} path={RouterPathEnum.MEMBER} />
            <Route 
                path= {this.props.match.url + '/:id'} 
                render={ (props) => <Member {...props} memberModel={ this.getMemberModelFromUrl() } /> } 
            /> 
        </Switch>
      </div>
    );
  }
}

export default Members;
