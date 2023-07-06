import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'src\components\trip\style.css'

class CreateTrip extends React.Component<RouteComponentProps<CreateTrip>, {}> {
  constructor(props : RouteComponentProps<CreateTrip>){
    super(props);
  }


  render() {
    return (
       <>
        
        <div className="board" style={{ backgroundImage: "url('https://familyvacationist.com/wp-content/uploads/2…-Yellowstone-National-Park-Photo-Shutterstock.jpg')" }} </div>
        <div
        className="home-header-title">We plan, you travel
        </div>
        </>
        
        
    )
  }
  
  export default CreateTrip;
  