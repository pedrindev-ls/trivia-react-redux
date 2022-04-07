import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Settings from './Pages/Settings/Settings';
import Game from './Pages/Game/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/settings" render={ (props) => <Settings { ...props } /> } />
      <Route patch="/game" render={ (props) => <Game { ...props } /> } />
    </Switch>
  );
}
