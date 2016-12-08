import { v4 } from 'uuid';
import { createModule } from 'redux-modules';
import { loop, liftState, Effects } from 'redux-loop';
import stopwatchModule from '../Stopwatch/module';
import pokemonModule from '../PokemonMe/module';

export const randomBool = n => !!Math.round(Math.random());

const replaceAtIndex = (index, object, array) =>
  [].concat(
    array.slice(0, index),
    [object],
    array.slice(index + 1),
  );

const composeLoops = (composition, models) =>
  models.reduce((acc, [state, args]) => {
    const [reducer, action] = composition;
    const [model, effect] = reducer(state, action(args));
    return [
      acc[0].concat([model]),
      acc[1].concat([effect]),
    ];
  }, [[], []]);

const childModules = {
  pokemonMe: pokemonModule,
  stopwatch: stopwatchModule,
};

const module = createModule({
  name: 'dashboard',
  initialState: {
    name: '',
    content: {},
    contentType: '',
    children: {},
    orientation: null,
  },
  selector: state => state.dashboard,
  composes: [liftState],
  middleware: [(a) => { console.log(a); return a; }],
  transformations: {
    init: state => ({...state, contentType: randomBool() ? 'pokemonMe' : 'stopwatch' }),
    addChild: (state) => {
      const [newChild, neff] = module.reducer(undefined, module.actions.init());
      return loop(
        { ...state, children: { ...state.children, [v4()]: newChild } },
        neff,
      );
    },
    updateContent: (state, { payload: action }) => {
      const [content, effect] = childModules[state.contentType].reducer(
        state.content,
        action,
      );

      return loop(
        { ...state, content },
        Effects.lift(effect, a => module.actions.updateContent(a)),
      );
    },
    split: (state, { payload: orientation }) => {
      const reduceChild = [module.reducer, module.actions.init];
      const childrenModels = [[state], [undefined]];
      const [children, childrenEff] = composeLoops(reduceChild, childrenModels);

      const effects = Effects.batch(
        childrenEff.map((effect, id) =>
          Effects.lift(effect, a => module.actions.updateChild(a, { id })),
        ),
      );
      return loop(
        { ...state, orientation, children: children.reduce((acc, child) => ({ ...acc, [v4()]: child }), {}) },
        effects,
      );
    },
    splitRequest: (state, { payload: orientation }) => {
      const effect = orientation !== state.orientation
        ? Effects.constant(module.actions.split(orientation))
        : Effects.constant(module.actions.addChild());
      return loop(state, effect);
    },
    updateChild: ({ children, ...state }, { payload, meta }) => {
      const childToUpdate = children[meta.id];
      const [updatedChild, neff] = module.reducer(childToUpdate, payload);
      const effects =
        Effects.lift(neff, a => module.actions.updateChild(a, { id: meta.id }));

      return loop(
        { ...state, children: { ...children, [meta.id]: updatedChild } },
        effects,
      );
    },
  },
});

export default module;
