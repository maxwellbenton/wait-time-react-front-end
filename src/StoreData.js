import React, {Component} from 'react'
import Store from './Store'
import { Link } from 'react-router-dom'

export default class StoresPage extends Component{
    constructor() {
        super()
        this.state = {
            stores: []
        }
    }
    
    getStoreData() {
        fetch(`http://localhost:3000/api/v1/dataSearch`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            },
            body: JSON.stringify({
                location: {
                    latitude: this.props.curState.latitude,
                    longitude: this.props.curState.longitude
                }
            })
        })
        .then(res => res.json() )
        .then()
    }

    //<Link to="/stores/new">Add Store</Link>
    render() {
        return (
            <div className="storesPage text-center">
                <h5 className="title">Search Bar</h5>
                <Link to="/stores/new">Add Store</Link>
                {this.getStoreData()}
            </div>
            
        )
    }
    
}
