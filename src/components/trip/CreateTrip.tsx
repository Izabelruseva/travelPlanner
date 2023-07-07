import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'src/components/trip/style.css'

class CreateTrip extends React.Component<RouteComponentProps<CreateTrip>, {}> {
  constructor(props : RouteComponentProps<CreateTrip>){
    super(props);
  }


  render() {
    return (
      <> 
        <div>
          <h1 className='heading'>We plan you travel</h1> 
          <p className='text'>Choose your dates</p>
          </div>
        </>
        
        
    );
  }
}
  export default CreateTrip;
  