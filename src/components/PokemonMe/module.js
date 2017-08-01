import { createModule } from 'redux-modules';
import { loop, Effects as Ef, liftState } from 'redux-loop';
import {
  decoratePayload,
  checkOrAssignNumber,
  sanitizeResponse,
  logAction,
} from './helpers';
import { propCheck } from 'redux-modules-middleware';
import { PropTypes } from 'react';

const apiBaseUrl = 'http://pokeapi.co/api/v2';
const pokemonApi = {
  fetch: ({ onSuccess, onError, pokemonNumber }) => () =>
    fetch(`${apiBaseUrl}/pokemon/${pokemonNumber}`)
    .then(res => res.json())
    .then(onSuccess)
    .catch(onError),
};

const module = createModule({
  name: 'pokemonMe',
  initialState: { active: {}, loading: false, errors: null, hydrated: false },
  selector: state => state.pokemonMe,
  composes: [liftState],
  transformations: {
    init: state => state,

    fetch: {
      middleware: [
        propCheck(PropTypes.number),
        decoratePayload(checkOrAssignNumber),
        logAction,
      ],
      reducer: (state, { payload: pokemonNumber }) => loop(
        { ...state, loading: true },
        Ef.promise(
          pokemonApi.fetch({
            onSuccess: module.actions.fetchSuccess,
            onError: module.actions.fetchError,
            pokemonNumber,
          }),
        ),
      ),
    },

    fetchSuccess: {
      middleware: [
        decoratePayload(sanitizeResponse),
        logAction,
      ],
      reducer: (state, { payload }) =>
        ({ ...state, active: payload, loading: false, hydrated: true }),
    },

    fetchError: (state, { payload }) =>
      ({ ...state, errors: payload, loading: false }),
  },
});

export default module;
