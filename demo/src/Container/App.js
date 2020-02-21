import React from 'react';
import './App.css';
import {BrowserRouter as Router,Switch} from 'react-router-dom'

import Login from './Login/login'
import Register from './Register/register';
import Display from './Display/display'
import viewUser from './Display/viewUser'
import CRoute from '../CustomRoute/customRoute';
import Header from '../Layout/Header.js'
import unAuthorizedAccess from '../UnAuthorizedAccess'

class App extends React.Component {
  render(){
     const admin="admin";
     const user="user";
     return (
      <Router>
      <Header/>
          <Switch>
                <CRoute exact path="/" component={Login} />
                <CRoute  crole={[admin,user]} path="/register" component={Register} />
                <CRoute cprivate crole={[admin]} path="/display" component={Display} />
                <CRoute cprivate crole={[admin]} path="/viewuser" component={viewUser} />
                <CRoute  path="/unAuthorizedAccess" component={unAuthorizedAccess} />
           </Switch>
        </Router>
  );
  }
}

export default App;
