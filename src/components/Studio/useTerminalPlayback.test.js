import { act, renderHook } from '@testing-library/react';
import { createBoardDemo, executeDemo } from './demoScripts';
import useTerminalPlayback from './useTerminalPlayback';

jest.mock('./demoScripts', () => ({
  ...jest.requireActual('./demoScripts'),
  executeDemo: jest.fn()
}));
let visibility;
const demo=createBoardDemo();
const outcome={lines:['2/3 steps complete','Build board ready. Your turn.'],result:{tasks:[],completed:2,total:3}};

beforeEach(()=>{
  jest.useFakeTimers();
  executeDemo.mockReset().mockResolvedValue(outcome);
  global.IntersectionObserver=class {
    constructor(callback) { visibility=callback; }
    observe(target) { visibility([{isIntersecting:true,target}]); }
    disconnect() {}
  };
});
afterEach(()=>{jest.useRealTimers();delete global.IntersectionObserver;});
function setup(reduced=false) {
  const ref={current:document.createElement('div')};
  return {ref,...renderHook(()=>useTerminalPlayback(demo,ref,reduced,false))};
}

test('pausing freezes typing, and replay starts a fresh run',async()=>{
  const {result}=setup();
  act(()=>jest.advanceTimersByTime(280));
  expect(result.current.code.length).toBeGreaterThan(0);
  act(()=>result.current.togglePause());
  const pausedCode=result.current.code;
  act(()=>jest.advanceTimersByTime(1000));
  expect(result.current.code).toBe(pausedCode);
  expect(executeDemo).not.toHaveBeenCalled();
  act(()=>result.current.togglePause());
  await act(async()=>{jest.advanceTimersByTime(10000);});
  expect(result.current.done).toBe(true);
  expect(executeDemo).toHaveBeenCalledTimes(1);
  act(()=>result.current.replay());
  expect(result.current.done).toBe(false);
  expect(result.current.code).toBe('');
  expect(result.current.lines).toEqual([]);
});

test('leaving the viewport suspends playback; showing the result still executes the script',async()=>{
  const {ref,result}=setup();
  act(()=>jest.advanceTimersByTime(280));
  const before=result.current.code;
  act(()=>visibility([{isIntersecting:false,target:ref.current}]));
  act(()=>jest.advanceTimersByTime(1000));
  expect(result.current.code).toBe(before);
  await act(async()=>result.current.skip());
  expect(executeDemo).toHaveBeenCalledWith(demo.code,expect.any(AbortSignal));
  expect(result.current.done).toBe(true);
});

test('reduced motion renders the executed result without a typing timer',async()=>{
  const {result,unmount}=setup(true);
  await act(async()=>{});
  expect(result.current.done).toBe(true);
  expect(result.current.code).toBe(demo.code);
  expect(result.current.lines).toEqual(outcome.lines);
  const signal=executeDemo.mock.calls[0][1];
  unmount();
  expect(signal.aborted).toBe(true);
});
