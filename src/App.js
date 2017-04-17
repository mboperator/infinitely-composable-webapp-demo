import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {getContext} from 'recompose';
import { Menu, SubMenu } from 'antd';
import { Link, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import PokemonMe from './components/PokemonMe';
import TreeChart from './components/TreeChart';
import Stopwatch from './components/Stopwatch';
import ColorTicker from './components/ColorTicker';

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

    <Menu mode="horizontal">
      <Menu.Item>
        <Link to="/">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/colorTicker">
          Color Ticker
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/pokemonMe">
          Pokemon Me
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/stopwatch">
          Stopwatch
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">
          Dashboard
        </Link>
      </Menu.Item>
    </Menu>

    <Route exact path="/visualize" component={ConfiguredTree} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path ="/colorTicker" component={ColorTicker} />
    <Route exact path ="/pokemonMe" component={PokemonMe} />
    <Route exact path ="/stopwatch" component={Stopwatch} />
  </div>
);

export default App;
