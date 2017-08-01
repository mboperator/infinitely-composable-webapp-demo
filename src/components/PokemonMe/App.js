import React, { PropTypes } from 'react';
import { connectModule } from 'redux-modules';
import { compose, lifecycle } from 'recompose';
import { Button, Spin } from 'antd';
import module from './module';
import './App.css';

const PokemonMe = ({ actions, active = {} , loading }) => (
  <div className="PokemonMe">
    <div className="PokemonMe-menu">
      <h1>{active.name}</h1>
    </div>
    <div className="PokemonMe-image">
      {loading
        ? <Spin />
        : <img src={active.picture} />
      }
    </div>
    <div className="PokemonMe-menu">
      <Button type="primary" onClick={actions.fetch}>
        another one
      </Button>
    </div>
  </div>
);

PokemonMe.PropTypes = {
  actions: PropTypes.shape({
    fetch: PropTypes.func.isRequired,
  }),
  active: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    picture: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default compose(
  connectModule(module),
  lifecycle({
    componentWillMount() {
      !this.props.actions.hydrated &&
        this.props.actions.fetch();
    }
  })
)(PokemonMe);
