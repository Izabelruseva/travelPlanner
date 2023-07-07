import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'src/components/about/about.css'

class About extends React.Component<RouteComponentProps<About>, {}> {
  constructor(props : RouteComponentProps<About>){
    super(props);
  }

  render() {
    return(
      <div className='about-page'>
      <div className='about-all'>
        <h2 className='about-heading'>We are happy to have you interested in becoming part of our team</h2>
        <p className='about-text'>You are a few steps away from starting the experience</p>
        <p className='about-text'>Turn your road trip into an adventure.By becoming part of our family you will be able to save ideas for your future trip </p>
        <button className='btn' onClick={ ( e: any ) => this.props.history.goBack() }>
            Go to home page to know more about us✈
        </button>
      </div>
      </div>
    );
  }
}

export default About;

