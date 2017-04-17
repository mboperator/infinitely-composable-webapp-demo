import React from 'react';
import { connectModule } from 'redux-modules';
import './App.css';
import Stopwatch from '../Stopwatch';
import module from './module';

class ColorTicker extends React.Component {
  constructor(props) {
    super(props);
    props.actions.init();
  }

  render() {
    const { actions, color, stopwatch } = this.props;
    return (
      <div className="App" style={{ backgroundColor: color }}>
        <Stopwatch
          {...stopwatch}
          dispatch={
            a => {
              return actions.updateStopwatch({ action: a });
            }
          }
        />
      </div>
    );
  }
}

export const Component = ColorTicker;
export default connectModule(module)(ColorTicker);
