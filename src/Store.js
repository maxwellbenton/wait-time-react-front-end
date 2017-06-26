import React, { Component } from 'react';

export default class Store extends Component {

render() {
    return(
        <div className="card">
            <h4>{this.props.store.name}</h4>
            <h5>{this.props.store.address}</h5>
            
        </div>
    )
}

}