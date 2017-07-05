import React, { Component } from 'react';
import Chart from './Chart'
import {StoresAdapter} from './adapters/'


export default class StoreDetail extends Component {
        constructor() {
            super()
            this.state = {
                store: null,
                hoursData: null
            }
        }
        
        displayChart() {
            if(this.state.store.wait_times.length > 0) {
                return(
                    <Chart data={this.state.store}/>
                )
            } else {
                return "No data available"
            }
        }
        getStoreInfo() {
            StoresAdapter.show(this._reactInternalInstance._context.router.route.match.params.id)
                .then(store => this.setState({store}))
        }

        render () {
            if(this.state.store === null) {
                {this.getStoreInfo()}
                return <div>Loading store data...</div>
            } else {
                return(
                    <div>
                        <h3>{this.state.store.name}</h3>
                        <h4>{this.state.store.address}</h4>
                        {this.displayChart()}
                        <div>
                            Lines Timed: {this.state.store.wait_times.length}
                        </div>
                        <div>
                            Total Average Wait Time: {this.state.store.wait_times.map(wt => wt.wait_time/1000).reduce((a,b) => a+b)/this.state.store.wait_times.length}
                        </div>
                    </div>
                )
            }
        }
}