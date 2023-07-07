import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class About extends React.Component<RouteComponentProps<About>, {}> {
  constructor(props : RouteComponentProps<About>){
    super(props);
  }

  render() {
    return(
      <div className='about-all'>
        <h2 className='about-heading'>We are happy to have you interested in becoming part of our team😊</h2>
        <p className='about-text'>You are a few steps away from starting the experience</p>
        <p className='about-text'>dddd</p>
        <button onClick={ ( e: any ) => this.props.history.goBack() }>
            go back
        </button>
      </div>
    );
  }
}

export default About;

