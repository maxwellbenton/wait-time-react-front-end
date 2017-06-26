import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {StoresAdapter} from '../src/adapters'
import Store from './Store'

export default class StoresPage extends Component{
    constructor() {
        super()
        this.state = {
            location: this.getLocation(),
            stores: []
        }
    }

    getLocation() {
        if(navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            console.log(lat + ", " + lng)
            localStorage.setItem('location', [lat, lng])
            this.findNearbyStores(lat, lng)
            return {latitude: lat, longitude: lng}
          })
        } else {
          console.log('geoL error')
          return "This browser does not support HTML5 geolocation"
        }
      
    }

    findNearbyStores(lat, lng) {
        StoresAdapter.wideSearch(lat, lng)
        .then(stores => {
            this.setState({
                stores: stores
            })
        })
    }
    renderStores() {
        return this.state.stores.map(store => <div className="col-md-3"><Store store={store}/></div>)
    }


    render() {
        return (
            <div className="col-4 four">
            <div className="row">
                <h3>Stores</h3>
            </div>
            <div className="row">
                <Link to="/stores/new">Add Store</Link>
            </div>
            <div className="row">
                {this.renderStores()}
            </div>       
            
            </div>
            
        )
    }
    
}
