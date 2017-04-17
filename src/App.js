import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {getContext} from 'recompose';
import { Link, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PokemonMe from './components/PokemonMe';
import TreeChart from './components/TreeChart';
import Stopwatch from './components/Stopwatch';

const ConfiguredTree = connect(s => {
  return s || {};
})(
  state => {
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
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
    <div>
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
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
      <Link to="/visualize">
        State Visualizer
      </Link>
    </div>

    <Route exact path="/visualize" component={ConfiguredTree} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path ="/pokemonMe" component={PokemonMe} />
    <Route exact path ="/stopwatch" component={Stopwatch} />
  </div>
);

export default App;
