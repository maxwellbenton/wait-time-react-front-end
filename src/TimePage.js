import React, { Component } from 'react';
import Timer from './Timer'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      timerStarted: false,
      startTime: null,
      waitTime: null,
      curStore: null
    }
  }

  render() {
    console.log(this.props.nearbyStores)
    //<TimingPage store={this.state.curStore} onClick={this.timeWait} timeInfo={this.state}/>
    return (
      <div className="timePage text-center">
          <img height="280" className="img-fluid" src="../pocket_watch_1.png" alt="pocket watch image"/>
          <Timer timeInfo={this.state}/>
      </div>
    );
  }
}

export default App;