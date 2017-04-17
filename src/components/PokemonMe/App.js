import React, { PropTypes } from 'react';
import { connectModule } from 'redux-modules';
import { compose, lifecycle } from 'recompose';
import module from './module';
import './App.css';

const PokemonMe = ({ actions, active = {} }) => (
  <div className="PokemonMe">
    <div className="PokemonMe-menu">
      <label>{active.name}</label>
    </div>
    <div className="PokemonMe-image">
      <img src={active.picture} />
    </div>
    <div className="PokemonMe-menu">
      <button onClick={actions.fetch}>
        another one
      </button>
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
      this.props.actions.hydrated &&
        this.props.actions.fetch(); 
    }
  })
)(PokemonMe);
