import React, { Component } from 'react';

export default class StoreMap extends Component {

render() {
    //<Map curState={this.props.curState}/>
    var markers = this.props.nearbyStores.map((store,index) => `markers=color:red%7label:${index}%7${store.latitude},${store.longitude}&`).join()
    var divMarkers = this.props.nearbyStores.map((store) => {
        return null
    })
    console.log(this.props.curState.mapWidth)
    return(
        
        <div style={{width: '100%', height: '100%', backgroundImage: `url(http://maps.googleapis.com/maps/api/staticmap?center=${this.props.curState.latitude},${this.props.curState.longitude}&zoom=17&scale=1&size=900x${this.props.curState.mapHeight}&maptype=terrain&key=AIzaSyAp8NFhgePsN0k2su2CSbmWEPzFoX1dYR4&format=png&visual_refresh=true)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            
        </div>
    )
}

}