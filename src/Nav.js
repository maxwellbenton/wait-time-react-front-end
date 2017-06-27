import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  constructor() {
    super()
    this.navFunction = this.navFunction.bind(this)
  }

  navFunction() {
      var x = this.refs.navBtn
      if (x.className === "topnav") {
          x.className += " responsive";
      } else {
          x.className = "topnav";
      }
  }
render() {
  return (
    <nav className='topnav' ref={"navBtn"}>
      <div className='container-fluid text-center'>
        <div className="nav">
          <Link to="/">Home</Link>          
          <Link to="/storemap">Store Map</Link>
          <Link to="/storedata">Store Data</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/user/:id">User</Link>
          <Link to="/login">Log In</Link>
          <a className="icon" onClick={this.navFunction}>&#9776;</a>
        </div>
        
      </div>
    </nav>
  )
}
  
}
