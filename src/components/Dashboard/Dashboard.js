import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connectModule } from 'redux-modules';
import { Button } from 'antd';
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
    !this.props.actions.initialized &&
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
        {!Object.keys(children).length
          ? <ContentComponent
              {...content}
              dispatch={this.props.actions.updateContent}
            />
          : <div
              style={{
                display: 'flex',
                flex: 10,
                flexDirection: getOrientation(orientation),
              }}
            >
              {Object.keys(children).map(id => {
                console.log('Dashbaord!', children, id);
                return (
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
                )
              })}
            </div>
        }
        <div style={{ position: 'absolute', right: 2, bottom: 2 }}>
          <Button
            size="small"
            icon="right-square-o"
            onClick={() => actions.splitRequest('horizontal')}
          />
          <Button
            size="small"
            icon="down-square-o"
            onClick={() => actions.splitRequest('vertical')}
          />
        </div>
      </div>
    );
  }
}

export default connectModule(module)(Dashboard);
