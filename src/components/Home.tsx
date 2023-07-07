import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RouterPathEnum } from '../enums/RouterPathEnum';
import 'src/components/home.css'

const options = [
  { value: 'New York', label: 'New York' },
  { value: 'Las Vegas', label: 'Las Vegas' },
  { value: 'Rome', label: 'Rome' },
  { value: 'Paris', label: 'Paris' },
  { value: 'London', label: 'London' },
  { value: 'Dubai', label: 'Dubai' },
  { value: 'Barcelona', label: 'Barcelona' },
  { value: 'Madrid', label: 'Madrid' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Venice', label: 'Venice' },
  { value: 'Milan', label: 'Milan' },
  { value: 'Naples', label: 'Naples' },
  { value: 'Budapest', label: 'Budapest' },
  { value: 'Edinburg', label: 'Edinburg' },
  { value: 'Florence', label: 'Florence' }
];


class Home extends React.Component<RouteComponentProps<Home>, {}> {
  constructor(props : RouteComponentProps<Home>){
    super(props);
  }

  render() {
    return(
      <div className='page-home'>
        <p className='home-all'>
        <h2 className='home-heading'>Hi there, are you ready to start a new adventure?</h2>
        
        <p className='home-text'>To begin log in </p>
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.ABOUT ) }>
            log in
        </button>
        &nbsp;
        <button onClick={ ( e: any ) => this.onClickMove( RouterPathEnum.MEMBER ) }>
            See other's trip ideas
        </button>
        </p>
      </div>
    );
  }

  private onClickMove = ( routerPathEnum: RouterPathEnum ) => {
    this.props.history.push( routerPathEnum );
  }
}

export default Home;
