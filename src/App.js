import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Nav from './Nav'
import TimePage from './TimePage'
import EndTime from './EndTime'
import StoresPage from './StoresPage'
import StoreData from './StoreData'
import Footer from './Footer'
import Map from './Map'
import About from './About'
import Contact from './Contact'



class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {id: 1},
      timerStarted: 0,
      startTime: null,
      latitude: null,
      longitude: null,
      curLat: null,
      curLong: null,
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
    this.changeMap = this.changeMap.bind(this)
    this.resetTimeStatus = this.resetTimeStatus.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  render() {
    
    return (
      <div className="App container">
        <Nav handleClick={this.resetTimeStatus}/>
        <Route exact path="/" render={() => {
          if(this.state.timerStarted === 2) {
            return <div className="ending-page">
                    <EndTime handleClick={this.resetTimeStatus}/>
                  </div>
          } else {
            return <div className="landing-page">
                    <TimePage timerStarted={this.state.timerStarted} timeInfo={this.state.startTime} handleClick={this.toggleTimer}/>
                    <StoresPage initialPosition={{lat:this.state.curLat,long:this.state.curLong}} nearbyStores={this.state.nearbyStores} selectedStore={this.state.selectedStore} timerStarted={this.state.timerStarted} handleClick={this.toggleTimer}/>
                </div>
          }
        }} />
        <Route exact path="/map" render={() => {
          return  <div className="storemap-page">
                    <Map curState={this.state} mapChange={this.changeMap} nearbyStores={this.state.nearbyStores}/>
                  </div>
        }} />
        <Route exact path="/stores" render={() => {
          return  <div className="storedata-page">
                    <StoreData curState={this.state}/>
                  </div>
        }} />
        <Route exact path="/about" render={() => {
          return  <div className="about-page">
                    <About />
                  </div>
        }} />
        <Route exact path="/contact" render={() => {
          return  <div className="contact-page">
                    <Contact />
                  </div>
        }} />
        <div className="footer">
          <Footer />
        </div>
        
          
      </div>
    );
    
  }

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getNearbyStores(position.coords.latitude,position.coords.longitude) 
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
          if (this.state.curLat === null) {
            this.setState({
              latitude: lat, 
              longitude: lng,
              curLat: lat,
              curLong: lng,
              error: null,
              nearbyStores: data
            })
          } else {
            this.setState({
              latitude: lat, 
              longitude: lng,
              error: null,
              nearbyStores: data
            })
          }
        })
        console.log('local store data fetched')
  }

  toggleTimer(store) {
    console.log(!this.state.timerStarted)
    if(this.state.timerStarted === 0) {
          this.setState({
            timerStarted: 1,
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
            timerStarted: 2,
            startTime: null,
            selectedStore: null
          })
      })
      this.getNearbyStores(this.state.latitude, this.state.longitude) 
  }
  
  changeMap(lat, lng) {
    this.getNearbyStores(lat, lng) 
  }

  resetTimeStatus() {
    this.setState({
      timerStarted: 0
    })
  }
  

  logIn() {
    console.log('log in attempted');
  }

  

}

export default App;
