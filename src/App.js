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
    // Common floor queue
    this.floor_requests = [];
    this.interval_id = null;
    // Which lift is at which floor 
    this.lift_state = new Map([["lift-1", 1], ["lift-2", 1], ["lift-3", 1], ["lift-4", 1]]);

    // Is lift in transition
    this.lift_in_transition = new Map([["lift-1", false], ["lift-2", false], ["lift-3", false], ["lift-4", false]]);

    // Floor queue for each lift
    this.lift_queue = new Map([["lift-1", []], ["lift-2", []], ["lift-3", []], ["lift-4", []]]);
  }

  componentDidMount() {  
    this.lift_top_init = this.getTopValue("lift-1");

    for (let i = 0; i < 4; i++) {
      let lift_id = "lift-" + (i+1);
      this.moveLift(lift_id, "floor-1");
    }

    // Common floor queue handler
    this.interval_id = setInterval(this.processFloorRequest.bind(this), 100);

    // Add handlers for lift queues
    for (let i = 0; i < 4; i++) {
      
      // Moves the lift if it is not in transition and there are floors in it's queue to move to
      setInterval((function () {
        let lift_id = "lift-" + (i+1);
        let floors = this.lift_queue.get(lift_id);
        if (!this.lift_in_transition.get(lift_id) && (floors.length > 0)) {
          let floor_id = floors.shift();
          this.moveLift(lift_id, floor_id);
        }
      }).bind(this), 100);
      
    }

    // Add transition event listeners
    for (let i = 0; i < 4; i++) {
      let lift = document.getElementById("lift-" + (i+1));
      // Transition started
      lift.addEventListener("transitionrun", (function () {
        this.lift_in_transition.set(lift.id, true);
      }).bind(this));

      // Transition ended
      lift.addEventListener("transitionend", (function () {
        this.lift_in_transition.set(lift.id, false);
      }).bind(this));
    }

  }

  // Add a floor to common floor queue
  addFloorRequest(floor_id) {
    this.floor_requests.push(floor_id);
  }

  // Pop a floor from common floor queue
  popFloorRequest() {
    if (this.floor_requests.length > 0) {
      return this.floor_requests.shift();
    }
  }

  // Gets a floor from common floor queue and sends it to the closest lift's floor queue
  processFloorRequest() {
    let requestedFloorId = this.popFloorRequest();

    if(requestedFloorId !== undefined) {
      let lift_id = this.getClosestLift(requestedFloorId);

      // Add floor to the lift's queue
      let curr_queue = this.lift_queue.get(lift_id);
      curr_queue.push(requestedFloorId);
      this.lift_queue.set(lift_id, curr_queue);

    }
  }

  // Get the lift's id closest to the dest_floor_id
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

    let floorTopAbs = this.getTopValue(dest_floor_id);

    let distance = Math.abs(floorTopAbs - this.lift_top_init) + liftHeight;

    lift.style.top = -distance + "px";

    // Update lift's current floor number
    let floorNumber = parseInt(dest_floor_id.split("-")[1]);
    this.lift_state.set(lift_id, floorNumber);

  }

  handleClick(e) {
    let button = e.target;
    let floorId = "floor-" + button.id.split("-")[1];

    this.addFloorRequest(floorId);
  }

  render() {
    let num_floors = 10;
    const floorNumbers = Array.from(Array(num_floors).keys());
    return (
      <div>
        <h1>Lift Simulation</h1>
        <br/>
        <br/>
        <br/>
        <div className="container">
          {floorNumbers.map(i => {
            if (i === 0) {
              return <Floor number={floorNumbers.length - i} down={true} onClick={(e) => {this.handleClick(e)}}/>
            } 
            if (i === floorNumbers.length - 1) {
              return <Floor number={floorNumbers.length - i} up={true} onClick={(e) => {this.handleClick(e)}}/>
            } 
            
            return <Floor number={floorNumbers.length - i} up={true} down={true} onClick={(e) => {this.handleClick(e)}}/>
            
          })}
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
