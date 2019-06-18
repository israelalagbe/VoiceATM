import React, { Component, Fragment, useState } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import CssBaseline from '@material-ui/core/CssBaseline';
/* import logo from './logo.svg'; */
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import Login from './pages/Login'
import Register from './pages/Register';
import { observable, decorate, action } from 'mobx';
import { Robot } from './utils/Robot';
class App extends Component {
  step = 1;
  password="";
  /**
   * @type {Robot}
   */
  propTypes={robot:Robot}
  setStep(step) {
    this.step = step;
  }
  componentDidMount() {
    const {robot} = this.props;
    document.body.click()
    robot.say("Welcome")
    robot.say("Please enter your secret number")
  }
  render() {
    if (this.step == 1) {
      return (
        this.newMethod()
      );
    }
    else{
      return null;
    }

  }
  submit = (e) => {
    e.preventDefault()
    const {robot} = this.props;
    robot.say("Please wait while your transaction is processing: ")
    //this.setStep(this.step + 1)
  }
  setPassword=(event)=>{
    this.password=event.target.value
   
  }

  newMethod() {
    return <div className="atm">
      <div className="screen">
        <h1 style={{ color: 'white', textAlign: 'center' }}>Please say your secret number</h1>
        <form onSubmit={this.submit} style={{textAlign:'center'}}>
          <input type="text" onChange={this.setPassword} />
          <input type="submit" value="Submit"  />
        </form>
      </div>
    </div>;
  }
}
//
export default withRouter(inject('robot')(
  observer(decorate(App, {
    step: observable,
    setStep: action,
    password: observable,
    setPassword: action
  }))
));
