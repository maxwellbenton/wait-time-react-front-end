import React, { Component } from 'react';
import StopWatch from './StopWatch'

export default class Timer extends Component {

render() {
    var stopWatch = () => {
        if(!this.props.timeInfo.timerStarted) {
            return null
        } else {
            return <StopWatch time={this.props.timeInfo.startTime} />
        } 
    }
    
    return(
        <div>
            {stopWatch()}
            <div onClick={this.handleClick}>{this.props.timeInfo.timerStarted ? "Click to Stop" : "Click to Start"}</div>
        </div>
    )
}

}