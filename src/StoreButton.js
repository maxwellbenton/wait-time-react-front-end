import React, {Component} from 'react'

export default class StoreButton extends Component {

handleClick(event) {
    this.props.onClick(event)
}

render() {
  return (
      <div>
        {this.props.stores.map((store,index) => <div key={"store"+index}><button className="btn btn-block"  name={store.name} value={store.id} onClick={this.handleClick.bind(this)}>{store.name}</button></div>)}
      </div>
    
  )
}
}