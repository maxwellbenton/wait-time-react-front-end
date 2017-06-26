import React, { Component } from 'react';

import TimingPage from './TimingPage'
import StoreButton from './StoreButton'

import { WaitTimesAdapter } from '../src/adapters'
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
    this.timeWait = this.timeWait.bind(this)
    this.createWaitTime = this.createWaitTime.bind(this)
  }

  timeWait(event) {
    if(!this.state.timerStarted) {
      this.setState({
        timerStarted: true,
        startTime: new Date(),
        curStore: this.props.nearbyStores.find(store => store.id === parseInt(event.target.value, 10))
      })
      
    } else {
      let wtime = new Date()-this.state.startTime
      this.setState({
        timerStarted: false,
        waitTime: wtime,
        curStore: null
      })
      this.createWaitTime(wtime)
    }
  }

  

  createWaitTime(wtime) {
    WaitTimesAdapter.create({ time: wtime,
                              store_id: 1,
                              user_id: 1})
        .then(console.log)
  }

  render() {
    console.log(this.props.nearbyStores)

    return (
      <div className="col-4 five">
        <div className="row text-center">
                <div className="row text-center">
                  {this.state.curStore === null ? <StoreButton stores={this.props.nearbyStores} onClick={this.timeWait} /> : <TimingPage store={this.state.curStore} onClick={this.timeWait} timeInfo={this.state}/>}
                </div>
        </div>
      </div>
    );
  }
}

export default App;