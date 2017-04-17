import { createModule } from 'redux-modules';
import { loop, Effects } from 'redux-loop';

const initialState = {
  running: false,
  time: 0,
};

const defaultConfig = {
  increment: 1,

};

const moduleFactory = config => {
  const cfg = { ...defaultConfig, ...config };
  const module = createModule({
    name: 'stopwatch',
    initialState,
    selector: state => state.stopwatch,
    middleware: [a => { console.log(a); return a; }],
    transformations: {
      init: state => [{ ...initialState, ...state }, []],
      start: state => [{ ...state, running: true }, []],
      tick: state => [
        { ...state, time: state.time + cfg.increment },
        cfg.onTick ? [cfg.onTick()] : []
      ],
      stop: state => [{ ...state, running: false }, []],
      reset: state => [{ ...state, time: 0, running: false }, []],
    },
  });
  return module
}
export default moduleFactory;
