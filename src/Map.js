import React from 'react'
import GoogleMapReact from 'google-map-react'

export default class Map extends React.Component {
  

  render() {
    return (
       <GoogleMapReact
        bootstrapURLKeys={{key: , language: 'en'}}
        center={[this.props.curState.latitude, this.props.curState.longitude]}
        zoom={18}>
        
      </GoogleMapReact>
    );
  }
}