import React, { Component } from 'react';

import Map from './Map'

export default class StoreMap extends Component {

render() {
    
    return(
        <div style={{width: '100%', height: '100%'}}>
            <Map curState={this.props.curState}/>
        </div>
    )
}

}