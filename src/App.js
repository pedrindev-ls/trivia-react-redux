import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import './App.css';
import Game from './Pages/Game/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
    </Switch>
  );
}
