export function createBoardDemo() {
  return {
    kind: 'interface',
    filename: 'interface.js',
    title: 'A small idea, made tangible.',
    description: 'Watch a few lines become an interactive build board. Then finish the last step yourself.',
    label: '01 / THE INTERFACE',
    code: `const tasks = [
  { title: "Design the idea", done: true },
  { title: "Build the pieces", done: true },
  { title: "Ship something good", done: false }
];

const completed = tasks.filter(task => task.done).length;
console.log(completed + "/" + tasks.length + " steps complete");
console.log("Build board ready. Your turn.");
globalThis.result = { tasks, completed, total: tasks.length };`
  };
}

export function createSystemDemo(limit = 3) {
  if (![2, 3, 4].includes(limit)) throw new Error('Choose a limit of 2, 3, or 4.');
  return {
    kind: 'system',
    filename: 'limiter.js',
    title: 'Good systems know their limits.',
    description: 'A burst of requests. A tiny rate limiter. Watch what gets through, then change the policy and run it again.',
    label: '02 / THE SYSTEM',
    code: `const limit = ${limit};
const windowMs = 1000;
let start = 0, used = 0;
const events = [];

for (const time of [0, 100, 200, 300, 1100]) {
  if (time - start >= windowMs) {
    start = time;
    used = 0;
  }
  const status = ++used <= limit ? 200 : 429;
  events.push({ time, status });
  console.log(time + "ms → " + status);
}
console.log("Burst complete. Policy applied.");
globalThis.result = { events, limit, windowMs };`
  };
}

// Only these authored demos run. There is no user-supplied code or shell access.
export function executeDemo(code, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new Error('Demo cancelled.')); return; }
    let worker;
    let url;
    let timeout;
    const cleanup = () => {
      clearTimeout(timeout);
      worker?.terminate();
      if (url) URL.revokeObjectURL(url);
      signal?.removeEventListener('abort', abort);
    };
    const abort = () => { cleanup(); reject(new Error('Demo cancelled.')); };
    try {
      const source = `const lines = [];
const console = { log: (...values) => lines.push(values.map(String).join(" ")) };
try {
${code}
self.postMessage({ lines, result: globalThis.result });
} catch (error) { self.postMessage({ error: error.message }); }`;
      url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
      worker = new Worker(url);
      signal?.addEventListener('abort', abort, { once: true });
      timeout = setTimeout(() => { cleanup(); reject(new Error('The demo took too long. Try replaying it.')); }, 5000);
      worker.onmessage = ({ data }) => {
        cleanup();
        if (data.error) reject(new Error(data.error));
        else resolve(data);
      };
      worker.onerror = () => { cleanup(); reject(new Error('The demo could not run. Try replaying it.')); };
    } catch {
      cleanup();
      reject(new Error('This browser could not start the demo.'));
    }
  });
}
