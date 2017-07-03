import React, {Component} from 'react'
import Chart from './Chart'
import {StoresAdapter} from './adapters/'

export default class StoresPage extends Component{
    constructor() {
        super()
        this.state = {
            store: null
        }
        this.getStoreInfo = this.getStoreInfo.bind(this)
    }
    getFeedbackList() {
        console.log('feedback gettin')
    }

    componentDidMount() {
        this.getStoreInfo()
    }

    getStoreInfo() {
        StoresAdapter.show(this.props.store.id)
            .then(store => this.setState({store}))
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.store !== null ? <Chart store={this.state.store} /> : "Loading Chart..."}
                </div>
                <div className="storesPage text-center">
                    <div className="endData"> You Did Well  </div>
                    <div className="endFeedback"> You Did Well  </div>
                    Thank you!
                    <button onClick={this.props.handleClick}>Time another line</button>
                </div>
            </div>            
        )
    }
    
}

