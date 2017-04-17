import React from 'react';
import { connectModule } from 'redux-modules';
import { Button } from 'antd';

import './App.css';
import module from './module';

const { start, stop } = module.actions;

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.interval = setInterval(() => this.tick(), 1000);
    this.props.actions.init();
  }

  tick() {
    this.props.running && this.props.actions.tick();
  }

  render() {
    const { time, actions } = this.props;
    return (
      <div className="Stopwatch">
        <h1>
          {time}
        </h1>
        <div>
          {!this.props.running
            ? <Button
                type="primary"
                onClick={actions.start}>
                  Start
              </Button>
            : <Button
                type="danger"
                onClick={actions.stop}>
                  Stop
              </Button>
          }
          <Button onClick={actions.reset}>Reset</Button>
        </div>
      </div>
    );
  }
}

export const Component = Stopwatch;
export default connectModule(module)(Stopwatch);
