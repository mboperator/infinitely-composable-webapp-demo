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
  state = { hovering: false }

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
          border: this.state.hovering ? '1px solid red' : '1px dotted grey',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          transition: 'border 0.2s ease-in-out'
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          this.setState({ hovering: true });
        }}
        onMouseOut={(e) => {
          e.stopPropagation();
          this.setState({ hovering: false });
        }}
      >
        <div style={{ height: 'calc(100% - 25px)' }}>
          {!Object.keys(children).length
            ? <ContentComponent
                {...content}
                dispatch={this.props.actions.updateContent}
              />
            : <div
                style={{
                  display: 'flex',
                  height: '100%',
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
        </div>
        <div
          style={{
            height: '25px',
            backgroundColor: this.state.hovering && 'rgba(225, 117, 117, 0.70)',
          }}
        >
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
