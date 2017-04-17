import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {getContext} from 'recompose';
import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import TreeChart from './components/TreeChart';

const ConfiguredTree = connect(s => {
  return s.dashboard || {};
})(
  state => {
    console.log('Tree props', state);
    return (
      <TreeChart
        tree={state}
        size={500}
        aspectRatio={0.5}
        isSorted={false}
        widthBetweenNodesCoeff={1.5}
        heightBetweenNodesCoeff={2}
        style={{border: '1px solid black'}}
        tooltipOptions={{offset: {left: 30, top: 10}}}
      />
    );
  }
);

const App = (props) => (
  <Router>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div>
        <ul>
          <li>
            <Link to="/pokemonMe">
              Pokemon Me
            </Link>
          </li>
          <li>
            <Link to="/stopwatch">
              Stopwatch
            </Link>
          </li>
          <li>
            <Link to="/">
              Dashboard
            </Link>
          </li>
        </ul>
        <button>
          State Visualizer
        </button>
      </div>
      <ConfiguredTree />
      <Dashboard />
    </div>
  </Router>
);

export default App;
