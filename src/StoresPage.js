import React, {Component} from 'react'
import Store from './Store'

export default class StoresPage extends Component{
    constructor() {
        super()

        this.state = {
            nearbyStores: [],
            selectedStore: null
        }
    }
    onComponentDidMount() {
        this.setState({
            nearbyStores: this.props.nearbyStores,
            selectedStore: this.props.selectedStore
        })
    }
    
    renderStores() {
        if (this.props.timerStarted) {
            return <button key={this.props.selectedStore.id} className="storeButton"><Store store={this.props.selectedStore} handleClick={this.props.handleClick}/></button>
        } else {
            return this.props.nearbyStores.map(store => <button key={store.id} className="storeButton" ><Store store={store} handleClick={this.props.handleClick}/></button>)
        }
    }

    render() {
        return (
            <div className="storesPage text-center">
                {<h5 className="title">Choose a Store to Start Timer</h5>}
                {this.renderStores()}
            </div>
        )
    }
}
