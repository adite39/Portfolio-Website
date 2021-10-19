import React, { createContext, useReducer } from 'react';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Errorpage from "./components/Errorpage";

import { initialState, reducer } from "../src/reducer/UseReducer";
import SendMail from './components/SendMail';

// 1. contextAPI
export const UserContext = createContext();
const Routing = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/Logout">
        <Logout />
      </Route>

      <Route exact path="/sendmail">
        <SendMail />
      </Route>

      <Route>
        <Errorpage />
      </Route>
    </Switch>
  )
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}
export default App;