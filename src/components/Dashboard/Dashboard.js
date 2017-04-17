import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import module from './module';
import './styles.css';

import Stopwatch from '../Stopwatch';
import PokemonMe from '../PokemonMe';

const getOrientation = orientation =>
  (orientation === 'horizontal' ? 'row' : 'column');

const components = {
  stopwatch: Stopwatch,
  pokemonMe: PokemonMe,
};
const getComponent = (contentType) => {
  return components[contentType] || (() => <div>None</div>);
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.actions.init();
  }
  render() {
    const { children, content, actions, orientation, contentType } = this.props;
    const ContentComponent = getComponent(contentType);
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          border: '1px solid black',
          height: '100%',
          position: 'relative',
        }}
      >
        {!Object.keys(children).length &&
          <ContentComponent
            {...content}
            dispatch={this.props.actions.updateContent}
          />
        }
        <div
          style={{
            display: 'flex',
            flex: 10,
            flexDirection: getOrientation(orientation),
          }}
        >
          {Object.keys(children).map(id => (
            <Dashboard
              key={id}
              {...children[id]}
              actions={{
                ...bindActionCreators(
                  module.actions,
                  a => actions.updateChild(a, { id }),
                ),
              }}
            />
          ))}
        </div>
        <div style={{ position: 'absolute', left: 0, top: '40px' }}>
          <button onClick={() => actions.splitRequest('horizontal')}>
            Split Horizontal
          </button>
          <button onClick={() => actions.splitRequest('vertical')}>
            Split Vertical
          </button>
        </div>
      </div>
    );
  }
}

export default connectModule(module)(Dashboard);
