import React, {Component} from 'react'
import Timer from './Timer'

export default class TimingPage extends Component {

handleClick(event) {
    this.props.onClick(event)
    
}

render() {
  return (
      <div type="button" className="btn btn-lg"  onClick={this.handleClick.bind(this)}>
        <div className="row text-center">
            <div>
                <Timer timeInfo={this.props.timeInfo}/>
            </div>
        </div>
        <div>{this.props.store.name}</div>
      </div>
  )
}
}