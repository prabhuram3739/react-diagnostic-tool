import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import Dashboard from './components/dashboard/Dashboard';
import Subscriber from './components/subscriber/Subscriber';
import Diagnostics from './components/diagnostics/Diagnostics';
import Subscriptions from './components/simmanagement/Subscriptions';


export default function App() {
  const history = createBrowserHistory();

  return (
      <Dashboard/>
  );
}
