import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Game from './Pages/Game/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact patch="/" render={ (props) => <Login { ...props } /> } />
      {/* <Route patch="/game" render={ (props) => <Game { ...props } /> } /> */}
      <Route patch="/game" component={ Game } />
    </Switch>
  );
}
