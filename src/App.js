import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Nav from './Nav'
import LoginForm from './LoginForm'
import About from './About'
import Contact from './Contact'
import TimePage from './TimePage'
import UserPage from './UserPage'
import StoresPage from './StoresPage'
import NewStoreForm from './NewStoreForm'
import {WaitTimesAdapter} from '../src/adapters'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      timerStarted: false,
      startTime: null,
      waitTime: null,
      
      stores: []
    }
    this.timeWait = this.timeWait.bind(this)
    this.createWaitTime = this.createWaitTime.bind(this)
    this.logIn = this.logIn.bind(this)
    
  }

  

  logIn() {
    console.log('log in attempted');
  }

  timeWait() {
    if(!this.state.timerStarted) {
      this.setState({
        timerStarted: true,
        startTime: new Date()
      })
      
    } else {
      let wtime = new Date()-this.state.startTime
      this.setState({
        timerStarted: false,
        waitTime: wtime
      })
      this.createWaitTime(wtime)
    }
  }

  createWaitTime(wtime) {
    WaitTimesAdapter.create({ time: wtime,
                              store_id: 1,
                              user_id: 1})
        .then(console.log)
  }

  render() {
    var storeTest = this.state.stores[0] === 'undefined' ? this.state.stores[0].name : null
    return (
      <div className="App container">
        <div>
          <Nav />
        </div>
          <Route exact path='/' render={() => {
            return  <div>
                        <h1>{storeTest}</h1>
                        <TimePage nearbyStores={this.state.stores}/>
                        
        
                        
                    </div>
          }} />
          <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
          <Route path='/about' render={() => <About />} />
          <Route path='/contact' render={() => <Contact />} />
          <Route path='/stores' render={() => <StoresPage location={this.state.location}/>} />
          <Route path='/stores/new' render={() => <NewStoreForm />} />
          <Route path='/stores/:id/edit' render={() => <NewStoreForm />} />
          <Route path='/userss/:id' render={() => <UserPage />} />
      </div>
    );
  }
}

export default App;
