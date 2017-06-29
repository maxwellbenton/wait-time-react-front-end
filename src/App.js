import React, { Component } from 'react';
// import { Route } from 'react-router-dom'

import Nav from './Nav'
import TimePage from './TimePage'
import StoresPage from './StoresPage'
import Footer from './Footer'
import Container from './Container'
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {id: 1},
      timerStarted: false,
      startTime: null,
      latitude: null,
      longitude: null,
      selectedStore: null,
      error: null,
      nearbyStores: [],
      waitTime: null,
      mapHeight: 670,
      mapWidth: 375
    };
    this.toggleTimer = this.toggleTimer.bind(this)
    this.getNearbyStores = this.getNearbyStores.bind(this)
    this.createWaitTime = this.createWaitTime.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  render() {
    console.log(this.state.nearbyStores)
    
    return (
      <div className="App container">
        <div>
          <Nav />
        </div>
        <div className="main-view">
          <div className="landing-page">
              <TimePage timerStarted={this.state.timerStarted} timeInfo={this.state.startTime} handleClick={this.toggleTimer}/>
              <StoresPage initialPosition={{lat:this.state.latitude,long:this.state.longitude,}} nearbyStores={this.state.nearbyStores} selectedStore={this.state.selectedStore} timerStarted={this.state.timerStarted} handleClick={this.toggleTimer}/>
          </div>
          <div className="storemap-page">
            <Container curState={this.state}/>
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
          
      </div>
    );
    
  }

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getNearbyStores(position.coords.latitude,position.coords.longitude) //CHANGE TO position.coords.latitude & longitude,
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  getNearbyStores(lat, lng) {
    fetch(`http://localhost:3000/api/v1/searchStores`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({
            location: {
                latitude: lat,
                longitude: lng
            }
        })
    })
        .then(res => res.json() )
        .then(data => {
          this.setState({
            latitude: lat, 
            longitude: lng,
            error: null,
            nearbyStores: data
          });
        })
        
  }

  toggleTimer(store) {
    console.log(!this.state.timerStarted)
    if(!this.state.timerStarted) {
          this.setState({
            timerStarted: true,
            startTime: performance.now(),
            selectedStore: store
          })
        } else {
          
          this.createWaitTime(performance.now()-this.state.startTime)
        }
  }

  createWaitTime(waitTime) {
    fetch('http://localhost:3000/api/v1/wait_times', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        wait_time: {
            wait_time: waitTime,
            store_id: this.state.selectedStore.id,
            user_id: this.state.user.id
        }
      })
    }).then(response => response.json() )
      .then(() => {
        this.setState({
            timerStarted: false,
            startTime: null,
            selectedStore: null
          })
      })
      this.getNearbyStores(this.state.latitude, this.state.longitude) 
  }
  


  logIn() {
    console.log('log in attempted');
  }

  

}

export default App;
