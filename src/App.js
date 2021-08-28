import './App.css';
import React from 'react';


function Floor(props) {

  let upId = props.number + "up";
  let downId = props.number + "down";
  let hId = props.number + "floor";

  return (
    <div className="child">

      {
        
        props.up && <button className="btn" onClick={props.onClick} id={upId}>UP</button>
      }
      <br/>
      {
        props.down && <button className="btn" onClick={props.onClick} id={downId}>DOWN</button>
      }

      <h2 className="floorname" id={hId}>Floor {props.number}</h2>




    </div>
  
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.lift_top_init = null;
  }

  componentDidMount() {  
    let lift = document.getElementById("lift");
    let liftTop = lift.getBoundingClientRect().top;
    let viewTop = document.documentElement.scrollTop;
    this.lift_top_init = liftTop + viewTop;

    this.moveLift("1floor");

  }


  handleClick(e) {
    let button = e.target;
    let floorId = button.id[0] + "floor";

    this.moveLift(floorId);
    

  }

  moveLift(dest_floor_id) {
    let lift = document.getElementById("lift");
    let liftHeight = lift.getBoundingClientRect().height;
    

    let floor = document.getElementById(dest_floor_id);
    let floorTop = floor.getBoundingClientRect().top;
    let viewTop = document.documentElement.scrollTop;
    let floorTopAbs = floorTop + viewTop;

    let distance = Math.abs(floorTopAbs - this.lift_top_init) + liftHeight;

    lift.style.top = -distance + "px";

  }

  render() {
    return (
      <div>
        <h1>Lift Simulation</h1>
        <br/>
        <br/>
        <br/>
        <div className="container">
          <Floor number="4" down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="3" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="2" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="1" up={true} onClick={(e) => {this.handleClick(e)}}/>
        </div>
        <div className="lift" id="lift"></div>
        
        <a href="https://github.com/kakashiisawesome/lift-simulation"><button className="btn">CODE</button></a>
        
        

      </div>
      
      

    )
  }
}

export default App;
