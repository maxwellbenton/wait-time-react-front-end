import React, { Component } from 'react';

import {StoresAdapter} from './adapters/'


export default class StoreDetail extends Component {
        constructor() {
            super()
            this.state = {
                store: null
            }
        }
        
        render () {
            if(this.state.store === null || this.state.store.id !== this.props.store.id) {
                StoresAdapter.show(this.props.store.id)
                    .then(data => this.setState({store: data}))
            }
            if(this.state.store === null) {
                return <div>Loading store data...</div>
            } else {
                console.log(this.state.store)
                return(
                    <div>
                    <div>
                        <h3>{this.state.store.name}</h3>
                        <h4>{this.state.store.address}</h4>
                    </div>
                    <div>
                        {}
                    </div>
                    
                    </div>
                )
            }
             
        }
          
    
    


}