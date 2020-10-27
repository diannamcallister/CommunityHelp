import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './App.css';

import Tasks from './Tasks.jsx';
import TaskDescription from './TaskDescription';

function App() {
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/alltasks' component={ Tasks } />
          <Route exact path='/task' component={ TaskDescription } />
        </Switch>
      </BrowserRouter>

    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
