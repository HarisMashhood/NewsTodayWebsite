import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
export default class App extends Component {
  pageSize=12;
  render() {
    return (
      <div>
        <Router>
         <NavBar/>
         <Switch>
          <Route exact path="/"><News key="general" pageSize={this.pageSize} country="in" category="General"/></Route>
          <Route exact path="/Business"><News key="business" pageSize={this.pageSize} country="in" category="Business"/></Route>
          <Route exact path="/Entertainment"><News key="entertainment" pageSize={this.pageSize} country="in" category="Entertainment"/></Route>
          <Route exact path="/General"><News key="general" pageSize={this.pageSize} country="in" category="General"/></Route>
          <Route exact path="/Health"><News key="health" pageSize={this.pageSize} country="in" category="Health"/></Route>
          <Route exact path="/Science"><News key="science" pageSize={this.pageSize} country="in" category="Science"/></Route>
          <Route exact path="/Sports"><News key="sports" pageSize={this.pageSize} country="in" category="Sports"/></Route>
          <Route exact path="/Technology"><News key="technology" pageSize={this.pageSize} country="in" category="Technology"/></Route>
       
        </Switch>
         </Router>
      </div>
    )
  }
}

