import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Settings from './Pages/Settings/Settings';
import Game from './Pages/Game/Game';
import Feedback from './Pages/Feedback/Feedback';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
      <Route exact path="/settings" render={ (props) => <Settings { ...props } /> } />
      <Route exact path="/feedback" render={ (props) => <Feedback { ...props } /> } />
    </Switch>
  );
}
