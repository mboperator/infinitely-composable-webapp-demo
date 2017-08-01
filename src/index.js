import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { ModuleProvider } from 'redux-modules';
import { install, combineReducers } from 'redux-loop';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import App from './App';
import './index.css';

const store = createStore(s => s, {}, install());

ReactDOM.render(
  <ModuleProvider store={store} combineReducers={combineReducers}>
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Router>
        <App />
      </Router>
    </div>
  </ModuleProvider>,
  document.getElementById('root'),
);
