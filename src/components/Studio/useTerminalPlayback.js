import { useEffect, useState } from 'react';
import { executeDemo } from './demoScripts';

export default function useTerminalPlayback(demo, ref, reduced, motionPaused) {
  const [started, setStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(reduced);
  const [execution, setExecution] = useState(null);
  const [error, setError] = useState('');
  const [run, setRun] = useState(0);
  const command = `node ${demo.filename}`;
  const codeDuration = Math.ceil(demo.code.length / 4) * 28;
  const commandDuration = command.length * 36;
  const runAt = codeDuration + commandDuration;
  const outputAt = runAt + 700;
  const endAt = outputAt + (execution?.lines.length || 1) * 220 + 300;
  const done = !!execution && (instant || reduced || elapsed >= endAt);
  const readyToRun = started && (instant || reduced || elapsed >= runAt);
  const suspended = paused || motionPaused || !inView || !pageVisible;

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setInView(true); setStarted(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!readyToRun) return;
    const controller = new AbortController();
    executeDemo(demo.code, controller.signal).then(value => {
      if (!controller.signal.aborted) setExecution(value);
    }).catch(cause => {
      if (!controller.signal.aborted) setError(cause.message);
    });
    return () => controller.abort();
    // Once a run begins it can finish while playback is paused or off-screen.
    // Replay is the explicit cancellation boundary.
  }, [readyToRun, demo.code, run]);

  useEffect(() => {
    if (!started || suspended || done || error || instant || reduced) return;
    const timer = setInterval(() => setElapsed(value => value + 28), 28);
    return () => clearInterval(timer);
  }, [started, suspended, done, error, instant, reduced]);

  const replay = () => {
    setRun(value => value + 1);
    setExecution(null);
    setError('');
    setElapsed(0);
    setPaused(false);
    setInstant(reduced);
    setStarted(true);
  };
  const skip = () => { setStarted(true); setInstant(true); setPaused(false); };
  let phase = !started ? 'ready' : done ? 'done' : readyToRun ? 'running' : 'typing';
  if (execution && elapsed >= outputAt && !done) phase = 'output';
  if (error) phase = 'error';
  const linesVisible = done ? execution.lines.length : Math.max(0, Math.floor((elapsed - outputAt) / 220));
  return {
    phase, done, started, paused, suspended, execution, error, command,
    code: instant || reduced ? demo.code : demo.code.slice(0, Math.floor(elapsed / 28) * 4),
    commandText: instant || reduced ? command : command.slice(0, Math.max(0, Math.floor((elapsed - codeDuration) / 36))),
    codeComplete: instant || reduced || elapsed >= codeDuration,
    lines: execution?.lines.slice(0, linesVisible) || [],
    replay, skip, togglePause: () => setPaused(value => !value)
  };
}
