import './App.css';
import React from 'react';


function Floor(props) {

  let upId = "up-" + props.number;
  let downId = "down-" + props.number;
  let hId = "floor-" + props.number;

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
    this.floor_requests = [];
    this.interval_id = null;
    // Which lift is at which floor 
    this.lift_state = new Map([["lift-1", 1], ["lift-2", 1], ["lift-3", 1], ["lift-4", 1]])
  }

  componentDidMount() {  
    this.lift_top_init = this.getTopValue("lift-1");

    this.moveLift("lift-1", "floor-1");
    this.moveLift("lift-2", "floor-1");
    this.moveLift("lift-3", "floor-1");
    this.moveLift("lift-4", "floor-1");

    this.interval_id = setInterval(this.processFloorRequest.bind(this), 100);

  }

  addFloorRequest(floor_id) {
    this.floor_requests.push(floor_id);
  }

  popFloorRequest() {
    if (this.floor_requests.length > 0) {
      return this.floor_requests.shift();
    }
  }

  processFloorRequest() {
    let requestedFloorId = this.popFloorRequest();
    if(requestedFloorId !== undefined) {
      let lift_id = this.getClosestLift(requestedFloorId);
      this.moveLift(lift_id, requestedFloorId);
    }
  }

  // getClosestLift(floor_id) {
  //   let floorTop = this.getTopValue(floor_id);
  //   let closestLiftId = null;
  //   let minDistance = Number.MAX_SAFE_INTEGER;

  //   for (let i = 0; i < 4; i++) {
  //     let liftId = "lift-" + (i+1);
  //     let liftTop = this.getTopValue("lift-" + (i+1));
  //     let distance = Math.abs(floorTop - liftTop);
  //     if (distance <= minDistance) {
  //       minDistance = distance;
  //       closestLiftId = liftId;
  //     }
  //   }

  //   return closestLiftId;
  // }

  getClosestLift(dest_floor_id) {
    let dest_floor_number = parseInt(dest_floor_id.split("-")[1]);
    let closestLiftId = this.lift_state.keys[0];
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (const [lift_id, floor_number] of this.lift_state) {
      let distance = Math.abs(dest_floor_number - floor_number);
      if (distance < minDistance) {
        minDistance = distance;
        closestLiftId = lift_id;
      }
    }

    return closestLiftId;

  }

  getTopValue(elem_id) {
    let elem = document.getElementById(elem_id);
    let elemTop = elem.getBoundingClientRect().top;
    let viewTop = document.documentElement.scrollTop;
    let elemTopAbs = elemTop + viewTop;

    return elemTopAbs;
  }

  moveLift(lift_id, dest_floor_id) {
    let lift = document.getElementById(lift_id);
    let liftHeight = lift.getBoundingClientRect().height;
    

    // let floor = document.getElementById(dest_floor_id);
    // let floorTop = floor.getBoundingClientRect().top;
    // let viewTop = document.documentElement.scrollTop;
    // let floorTopAbs = floorTop + viewTop;
    let floorTopAbs = this.getTopValue(dest_floor_id);

    let distance = Math.abs(floorTopAbs - this.lift_top_init) + liftHeight;

    lift.style.top = -distance + "px";

    // Update lift state
    let floorNumber = parseInt(dest_floor_id.split("-")[1]);
    this.lift_state.set(lift_id, floorNumber);
    console.log(this.lift_state);

  }

  handleClick(e) {
    let button = e.target;
    let floorId = "floor-" + button.id.split("-")[1];

    this.addFloorRequest(floorId);
    

  }

  render() {
    return (
      <div>
        <h1>Lift Simulation</h1>
        <br/>
        <br/>
        <br/>
        <div className="container">
          <Floor number="10" down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="9" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="8" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="7" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="6" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="5" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="4" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="3" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="2" up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
          <Floor number="1" up={true} onClick={(e) => {this.handleClick(e)}}/>
        </div>
        <div className="lift-container">
          <div className="lift" id="lift-1"></div>
          <div className="lift" id="lift-2"></div>
          <div className="lift" id="lift-3"></div>
          <div className="lift" id="lift-4"></div>
        </div>
        
        
        <a href="https://github.com/kakashiisawesome/lift-simulation"><button className="btn">CODE</button></a>
        
        

      </div>
      
      

    )
  }
}

export default App;
