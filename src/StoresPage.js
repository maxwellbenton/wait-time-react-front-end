import React, {Component} from 'react'
import {StoresAdapter} from '../src/adapters'
import Store from './Store'

export default class StoresPage extends Component{

    renderStores() {
        return this.props.nearbyStores.map(store => <div key={store.id} className="col-md-3"><Store store={store}/></div>)
    }

    //<Link to="/stores/new">Add Store</Link>
    render() {
        return (
            <div className="storesPage text-center">
                {<h5 className="title">Choose a Store to Start Timer</h5>}
                {this.renderStores()}
            </div>
            
        )
    }
    
}
