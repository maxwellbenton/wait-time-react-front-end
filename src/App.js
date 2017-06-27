import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Nav from './Nav'
import TimePage from './TimePage'
import StoresPage from './StoresPage'
import StoreMap from './StoreMap'
import Footer from './Footer'
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
      waitTime: null
    };
    this.toggleTimer = this.toggleTimer.bind(this)
    this.getNearbyStores = this.getNearbyStores.bind(this)
    this.createWaitTime = this.createWaitTime.bind(this)
    this.logIn = this.logIn.bind(this)
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
    fetch(`https://wait-time-api.herokuapp.com/api/v1/searchStores`, {
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
    fetch('https://wait-time-api.herokuapp.com/api/v1/wait_times', {
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
      
  }

  logIn() {
    console.log('log in attempted');
  }

  render() {
    return (
      <div className="App container">
        <div>
          <Nav />
        </div>
        <div className="main-view">
          <div className="landing-page">
              <TimePage timerStarted={this.state.timerStarted}/>
              <StoresPage nearbyStores={this.state.nearbyStores} timerStarted={this.state.timerStarted}/>
          </div>
          <div className="storemap-page">
              <StoreMap nearbyStores={this.state.nearbyStores}/>
          </div>
          <div className="footer">
              <Footer />
          </div>
        </div>
          
      </div>
    );
    // var storeTest = this.state.stores[0] === 'undefined' ? this.state.stores[0].name : null
    // <Route exact path='/' render={() => { <App /> } } />
    // <Route path='/storemap' render={() => <StoreMap />} />
    // <Route path='/storedata' render={() => <StoresPage location={this.state.location}/>} />
    // <Route path='/about' render={() => <About />} />
    // <Route path='/contact' render={() => <Contact />} />
    // <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
    // <Route path='/stores/new' render={() => <NewStoreForm />} />
    // <Route path='/stores/:id/edit' render={() => <NewStoreForm />} />
    // <Route path='/userss/:id' render={() => <UserPage />} />
    // import LoginForm from './LoginForm'
    // import About from './About'
    // import Contact from './Contact'
    // import UserPage from './UserPage'
    // import NewStoreForm from './NewStoreForm'
    // import {WaitTimesAdapter} from '../src/adapters'
  }

}

export default App;
