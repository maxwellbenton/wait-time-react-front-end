import React, { Component } from 'react'

export default class LoginForm extends Component {

  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit( this.state )
    this.setState({username: '', password: ''})
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div><label>Username</label>
        <input type='text' value={this.state.username} name="username" onChange={this.handleChange}/></div>
        <div><label>Password</label>
        <input type='password' value={this.state.password} name="password" onChange={this.handleChange}/></div>
        <div><input type="submit" /></div>
      </form>
    )
  }
}