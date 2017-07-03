import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Nav from './Nav'
import TimePage from './TimePage'
import EndTime from './EndTime'
import StoresPage from './StoresPage'
import StoreSearchContainer from './StoreSearchContainer'
import Footer from './Footer'
import Map from './Map'
import About from './About'
import Contact from './Contact'

import {StoresAdapter, WaitTimesAdapter} from './adapters/'


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
      mapWidth: 375,
      searchTerm: "",
      storeDetail: null
      
    };
    this.toggleTimer = this.toggleTimer.bind(this)
    this.getNearbyStores = this.getNearbyStores.bind(this)
    this.getUserLocation = this.getUserLocation.bind(this)
    this.createWaitTime = this.createWaitTime.bind(this)
    this.changeMap = this.changeMap.bind(this)
    this.resetTimeStatus = this.resetTimeStatus.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  onComponentDidMount() {
    this.getNearbyStores()
  }
  render() {
    console.log(this.state.curLat)
    console.log(this.state.curLong)
    return (
      <div className="App container">
        <Nav handleClick={this.resetTimeStatus}/>
        <Route exact path="/" render={() => {
          if(this.state.curLat === null) {this.getUserLocation()}
          if(this.state.timerStarted === 2) {
            console.log(this.state.selectedStore)
            return <div className="ending-page">
                    <EndTime store={this.state.selectedStore} handleClick={this.resetTimeStatus}/>
                  </div>
          } else {
            console.log(this.state.selectedStore)
            return <div className="landing-page">
                    <TimePage timerStarted={this.state.timerStarted} timeInfo={this.state.startTime} handleClick={this.toggleTimer}/>
                    <StoresPage initialPosition={{lat:this.state.curLat,long:this.state.curLong}} nearbyStores={this.state.nearbyStores} selectedStore={this.state.selectedStore} timerStarted={this.state.timerStarted} handleClick={this.toggleTimer} />
                </div>
          }
        }} />
        <Route exact path="/map" render={() => {
          return  <div className="storemap-page">
                    <Map curState={this.state} mapChange={this.changeMap} nearbyStores={this.state.nearbyStores} getUserLocation={this.getUserLocation}/>
                  </div>
        }} />
        <Route path="/stores" render={() => {
          return  <div className="storedata-page">
                    <StoreSearchContainer getLoc={this.getUserLocation} curState={this.state} onChange={this.handleSearch}/>
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

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getNearbyStores(position.coords.latitude,position.coords.longitude) 
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }  

  getNearbyStores(lat, lng) {
    StoresAdapter.getLocalStores(lat, lng)
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
    WaitTimesAdapter.create(waitTime, this.state.selectedStore, this.state.user.id)
      .then(() => {
        this.setState({
            timerStarted: 2,
            startTime: null
            
          })
      })
      this.getNearbyStores(this.state.latitude, this.state.longitude) 
  }
  
  changeMap(lat, lng) {
    this.getNearbyStores(lat, lng) 
  }

  resetTimeStatus() {
    this.setState({
      timerStarted: 0,
      selectedStore: null
    })
  }
  
  handleSearch(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  logIn() {
    console.log('log in attempted');
  }

  

}

export default App;
