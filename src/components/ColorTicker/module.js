import { createModule } from 'redux-modules';
import { loop, Effects, liftState } from 'redux-loop';
import stopwatchModuleFactory from '../Stopwatch/module';


const randomColorComponent = () => Math.floor(Math.random() * 255);
const generateColor = () => [
  randomColorComponent(), randomColorComponent(), randomColorComponent()
];
const randomColor = () => `rgb(${generateColor().join(',')})`;

const initialState = {
  color: randomColor(),
  stopwatch: {},
};

let module;
const stopwatchModule = stopwatchModuleFactory({
  increment: 2,
  onTick: () => module.actions.foo(),
});

module = createModule({
  name: 'colorTicker',
  initialState,
  selector: state => state.colorTicker,
  composes: [liftState],
  middleware: [a => { console.log(a); return a; }],
  transformations: {
    init: state => {
      return ({ ...initialState, ...state });
    },
    foo: state => {
      debugger;
      return { ...state, color: randomColor() };
    },
    updateStopwatch: (state, { payload }) => {
      const [stopwatch, actions] =
        stopwatchModule.reducer(state.stopwatch, payload.action);
        const newState = { ...state, stopwatch: stopwatch };
        debugger;
        return actions.length
          ? module.reducer(newState, actions[0])
          : loop( newState, Effects.none() );
    }
  },
});

export default module;
