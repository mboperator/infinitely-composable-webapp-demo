import { createModule } from 'redux-modules';
import { loop, Effects, liftState } from 'redux-loop';
import stopwatchModuleFactory from '../Stopwatch/module';
const stopwatchModule = stopwatchModuleFactory({increment: 2});


const randomColorComponent = () => Math.floor(Math.random() * 255);
const generateColor = () => [
  randomColorComponent(), randomColorComponent(), randomColorComponent()
];
const randomColor = () => `rgb(${generateColor().join(',')})`;

const initialState = {
  color: randomColor(),
  stopwatch: {},
};

const module = createModule({
  name: 'colorTicker',
  initialState,
  selector: state => state.colorTicker,
  composes: [liftState],
  middleware: [a => { console.log(a); return a; }],
  transformations: {
    init: state => {
      return ({ ...initialState, ...state });
    },
    updateStopwatch: (state, { payload }) => {
      const [stopwatch, neff] = stopwatchModule.reducer(state.stopwatch, payload.action);
      const effects =
        Effects.lift(neff, a => module.actions.updateStopwatch(a));

      return loop(
        { ...state, stopwatch: stopwatch },
        effects,
      );
      return state;
    }
  },
});

export default module;
