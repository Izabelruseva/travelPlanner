import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { RouterPathEnum } from '../../enums/RouterPathEnum';

class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <ul className='ulContainer'>
          <p className='navHeading'>Travel Planner</p>
          <li><Link to={RouterPathEnum.HOME}>Home</Link></li>
          <li><Link to={RouterPathEnum.ABOUT}>Become a part of our team</Link></li>
          <li><Link to={RouterPathEnum.TRIPS}>Happy clients</Link></li>
          <li><Link to={RouterPathEnum.CREATE_TRIP}>Create Trip</Link></li>
        </ul>
      </div>
    );
  }
}

export default Header;
