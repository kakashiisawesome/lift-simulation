import logo from './logo.svg';
import './App.css';
import React from 'react';


function Floor(props) {
  return (
    <div>

      {
        props.up && <button className="btn">Up</button>
      }
      <br/>
      {
        props.down && <button className="btn">Down</button>
      }

      <h2 className="floorname">Floor {props.number}</h2>


    </div>
  
  )
}

class App extends React.Component {

  render() {
    return (
      <div className="divMain">
        <h1>Lift Simulation</h1>
        <br/>
        <br/>
        <br/>
        <Floor number="2" up={true} down={true}/>
        <Floor number="1" up={true}/>

      </div>
      
      

    )
  }
}

export default App;
