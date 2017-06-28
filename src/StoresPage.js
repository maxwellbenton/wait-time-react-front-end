import React, {Component} from 'react'
import Store from './Store'

export default class StoresPage extends Component{

    
    renderStores() {
        if (this.props.timerStarted) {
            return <button key={this.props.selectedStore.id} className="col-md-3" ><Store store={this.props.selectedStore} handleClick={this.props.handleClick}/></button>
        } else {
            return this.props.nearbyStores.map(store => <button key={store.id} className="col-md-3" ><Store store={store} handleClick={this.props.handleClick}/></button>)
        }
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
