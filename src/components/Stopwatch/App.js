import React from 'react';
import { connectModule } from 'redux-modules';
import { Button } from 'antd';

import './App.css';
import moduleFactory from './module';
const module = moduleFactory();

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
                icon="caret-right"
                onClick={actions.start}
              />
            : <Button
                type="danger"
                icon="pause"
                onClick={actions.stop}
              />
          }
          <Button icon="sync" onClick={actions.reset} />
        </div>
      </div>
    );
  }
}

export const Component = Stopwatch;
export default connectModule(module)(Stopwatch);
