import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Tasks from './Tasks.jsx';
import TaskDescription from './TaskDescription';

import Login from './Authentication';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/alltasks' component={ Tasks } />
          <Route exact path='/task' component={ TaskDescription } />
        </Switch>
      </BrowserRouter>

      <BrowserRouter>
        <Switch>
          <Route exact path='/authentication' component={ Login } />
        </Switch>
      </BrowserRouter>
      {/* <Login/> */}

    </div>
  );
}

export default App;
