import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact patch="/" render={ (props) => <Login { ...props } /> } />
    </Switch>
  );
}
