import { createBoardDemo, createSystemDemo } from './demoScripts';

function executeAuthoredScript(demo) {
  const lines=[];
  const scope={};
  // Execute the exact displayed script in a separate scope, as the browser worker does.
  new Function('console','globalThis',demo.code)({log:(...values)=>lines.push(values.map(String).join(' '))},scope);
  return {lines,result:scope.result};
}

test('the interface script produces a working board with one unfinished task',()=>{
  const {lines,result}=executeAuthoredScript(createBoardDemo());
  expect(result.total).toBe(3);
  expect(result.completed).toBe(2);
  expect(result.tasks.filter(task=>!task.done).map(task=>task.title)).toEqual(['Ship something good']);
  expect(lines[0]).toBe('2/3 steps complete');
});

test('a three-request policy blocks the fourth request and resets after one second',()=>{
  const {lines,result}=executeAuthoredScript(createSystemDemo(3));
  expect(result.events.map(event=>event.status)).toEqual([200,200,200,429,200]);
  expect(result.events[4].time).toBe(1100);
  expect(lines).toContain('300ms → 429');
  expect(lines).toContain('1100ms → 200');
});

test('changing the displayed policy changes the executed results',()=>{
  const strict=executeAuthoredScript(createSystemDemo(2)).result;
  const relaxed=executeAuthoredScript(createSystemDemo(4)).result;
  expect(strict.events.filter(event=>event.status===429)).toHaveLength(2);
  expect(relaxed.events.filter(event=>event.status===429)).toHaveLength(0);
});

test('the script generator only accepts supported numeric policies',()=>{
  expect(()=>createSystemDemo('3; throw new Error()')).toThrow();
  expect(()=>createSystemDemo(0)).toThrow();
});
