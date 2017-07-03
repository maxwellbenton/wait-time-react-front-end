import React, {Component} from 'react'
// import Store from './Store'

export default class StoresPage extends Component{
    getFeedbackList() {
        console.log('feedback gettin')
    }

    render() {
        return (
            <div className="storesPage text-center">
                <div className="endData"> You Did Well  </div>
                <div className="endFeedback"> You Did Well  </div>
                Thank you!
                <button onClick={this.props.handleClick}>Time another line</button>
            </div>
            
        )
    }
    
}

