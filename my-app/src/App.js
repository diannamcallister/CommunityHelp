import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Tasks from './Components/Tasks.jsx';
import TaskDescription from './Components/TaskDescription';
import Login from './Authentication';
import UserPage from './Components/UserPage/UserPage.js'
import UserProfile from './UserProfile.jsx'
import AdminUserPage from './Components/AdminUserPage/AdminUserPage.js'

function App() {
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/alltasks' component={ Tasks } />
          <Route exact path='/task' component={ TaskDescription } />
		      <Route exact path='/UserProfile' component={ UserProfile } />
          <Route exact path='/UserPage' component={ UserPage } />
		      <Route exact path='/AdminUserPage' component={ AdminUserPage } />
          <Route exact path='/authentication' component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
