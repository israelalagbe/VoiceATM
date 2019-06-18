import React, { Component } from 'react';
import { Switch, Route,Redirect } from 'react-router-dom'
import Home from '../pages/Home'
export default class Main extends Component{
    render(){
        return (
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/about' render={()=>{
                return <h1>About Page</h1>;
            }}/>
            <Redirect to="/" />
          </Switch>
          );
    }
}