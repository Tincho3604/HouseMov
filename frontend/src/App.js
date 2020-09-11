import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Sell from './pages/Sell'
import Buy from './pages/Buy'


class App extends React.Component{
  render(){

    return (

      <BrowserRouter>

        <Switch>

          <Route exact path = "/" component={Home}/>
          <Route path = "/sign-in" component={SignIn}/>
          <Route path = "/sign-up" component={SignUp}/>
          <Route path = "/buy" component = {Buy}/>
          <Route path = "/sell" component = {Sell}/>
          <Redirect to ="/"/>

        </Switch>

      </BrowserRouter>
    )
  }
}

export default App
