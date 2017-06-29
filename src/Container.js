import React, {Component} from 'react'
import GoogleMap from 'google-map-react'

const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

export default class Container extends Component {
  
  
  render() {
    
    return (
      <div style={{width: '100%', height: '100%'}}>
      <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyAHr8Z1lo-CaTqSk7jyuP2Zl66LVpDsz_M",
          language: 'en'
          }}
        center={[this.props.curState.latitude,this.props.curState.longitude]}
        zoom={17}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
      >
       
      </GoogleMap>       
      </div>
    )
  }
}
