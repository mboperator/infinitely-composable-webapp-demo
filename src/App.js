import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {getContext} from 'recompose';
import Dashboard from './components/Dashboard';
import TreeChart from './components/TreeChart';

const App = (props) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
    <TreeChart
      tree={props.dashboard}
      size={500}
      aspectRatio={0.5}
      isSorted={false}
      widthBetweenNodesCoeff={1.5}
      heightBetweenNodesCoeff={2}
      style={{border: '1px solid black'}}
      tooltipOptions={{offset: {left: 30, top: 10}}}
    />
    <Dashboard />
  </div>
);

export default connect(s => s)(App);
