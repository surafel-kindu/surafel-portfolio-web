import { useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiCheck, FiCode, FiPause, FiPlay, FiRotateCcw, FiTerminal } from 'react-icons/fi';
import { createBoardDemo, createSystemDemo } from './demoScripts';
import useTerminalPlayback from './useTerminalPlayback';

function Code({ text }) {
  const tokens = text.split(/(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:const|let|for|of|if|true|false|globalThis|console)\b|\b\d+\b)/g);
  return tokens.map((token, index) => {
    const type = token.startsWith('//') ? 'comment' : /^["']/.test(token) ? 'string' : /^\d+$/.test(token) ? 'number' : /^(const|let|for|of|if|true|false|globalThis|console)$/.test(token) ? 'keyword' : '';
    return type ? <span key={index} className={`code-${type}`}>{token}</span> : token;
  });
}

function WaitingDrawing({ kind }) {
  return <svg viewBox="0 0 360 260" className={`waiting-drawing drawing-${kind}`} aria-hidden="true">
    <defs><pattern id={`demo-grid-${kind}`} width="60" height="35" patternUnits="userSpaceOnUse"><path d="M0 0L60 35M60 0L0 35" fill="none" stroke="#d6dacd" strokeWidth=".6" /></pattern></defs>
    <path d="M5 155L185 50L360 150L180 255Z" fill={`url(#demo-grid-${kind})`} />
    <g className="drawing-platform">
      <path d="M50 150L180 75L310 150V169L180 244L50 169Z" fill="#f0f2e9" stroke="#858d7b" strokeWidth="1" />
      <path d="M50 150L180 225L310 150M180 225V244" fill="none" stroke="#858d7b" />
      {kind === 'interface' ? <g fill="#fafbf7" stroke="#858d7b"><path d="M85 129V52L233 137V214Z" /><path d="M85 66L233 151M99 77L148 105V150L99 122ZM161 112L217 145M161 124L217 157M99 139L217 207" /><circle cx="93" cy="60" r="1" /></g> : <g fill="#fafbf7" stroke="#858d7b"><path d="M115 137L180 100L245 137V160L180 198L115 160ZM115 137L180 175L245 137M180 175V198" /><path d="M146 136L180 117L214 136L180 155Z" fill="#e8ebdf" /><path d="M180 175V122" stroke="#e7683e" strokeDasharray="2 3" /></g>}
    </g>
    <g className="drawing-signal" fill="none" stroke="#e7683e" strokeWidth="1.2"><path d="M265 85Q289 99 265 113M272 79Q307 99 272 119M279 73Q325 99 279 125" /></g>
    <circle className="drawing-packet" cx="68" cy="176" r="3" fill="#e7683e" />
  </svg>;
}

function BuildBoard({ result }) {
  const [tasks, setTasks] = useState(result.tasks);
  const completed = tasks.filter(task => task.done).length;
  const progress = Math.round(completed / tasks.length * 100);
  return <div className="build-board">
    <div className="result-app-header"><span className="board-brand">sk<span>✳</span></span><span>THE BUILD BOARD</span><span className="board-avatar">S</span></div>
    <p className="eyebrow">A GOOD IDEA, IN MOTION.</p><h4>Make something<br />you’re proud of.</h4>
    <div className="board-progress"><span>{completed} of {tasks.length} steps complete</span><strong>{progress}%</strong><div><i style={{ width: `${progress}%` }} /></div></div>
    <div className="board-tasks">{tasks.map((task, index) => <button key={task.title} aria-pressed={task.done} onClick={() => setTasks(previous => previous.map((item, i) => i === index ? { ...item, done: !item.done } : item))}><span className={`task-check ${task.done ? 'checked' : ''}`}>{task.done && <FiCheck />}</span><span>{task.title}</span><span className="task-number">0{index + 1}</span></button>)}</div>
    <div className="board-footer" role="status">{completed === tasks.length ? <><span className="status-dot" /> All done. Ready for the world.</> : <>Your turn. Click a step to change it.<FiArrowRight /></>}</div>
  </div>;
}

function SystemResult({ result, onLimitChange }) {
  const allowed = result.events.filter(event => event.status === 200).length;
  const blocked = result.events.length - allowed;
  return <div className="system-result">
    <div className="result-app-header"><span className="system-brand">↳</span><span>REQUEST CONTROL</span><span className="result-online"><span />ONLINE</span></div>
    <p className="eyebrow">ONE BURST. A CLEAR POLICY.</p><h4>Keep the good<br />requests moving.</h4>
    <div className="system-metrics"><div><strong>{allowed.toString().padStart(2,'0')}</strong><span>ALLOWED</span></div><div><strong>{blocked.toString().padStart(2,'0')}</strong><span>RATE LIMITED</span></div><div><strong>1s</strong><span>WINDOW</span></div></div>
    <div className="request-events" aria-label="Request results">{result.events.map((event, index) => <div key={event.time} className={event.status===200?'request-allowed':'request-blocked'} style={{'--event-delay':`${index*90}ms`}}><span>{event.time}ms</span><i /><strong>{event.status}</strong></div>)}</div>
    <div className="system-policy"><label htmlFor="demo-request-limit">Requests per second</label><select id="demo-request-limit" value={result.limit} onChange={event => onLimitChange(Number(event.target.value))}>{[2,3,4].map(value=><option key={value} value={value}>{value} requests</option>)}</select></div>
    <p className="result-note">At 1100ms, a new window opens. Requests can pass again.</p>
  </div>;
}

function TerminalPlayer({ demo, reduced, motionPaused, onLimitChange }) {
  const container = useRef(null);
  const player = useTerminalPlayback(demo, container, reduced, motionPaused);
  const status = player.error ? 'Run failed' : player.done ? 'Result ready' : player.suspended && player.started ? 'Paused' : player.phase==='ready' ? 'Ready to build' : player.phase==='typing' ? 'Typing the script' : player.phase==='output' ? 'Reading the output' : 'Running the script';
  return <div ref={container} className="terminal-player" data-phase={player.phase} data-demo={demo.kind}>
    <div className="demo-steps" aria-label="Demo progress">{['Type','Run','Result'].map((step,index)=><span key={step} className={(index===0 && player.started)||(index===1 && ['running','output','done'].includes(player.phase))||(index===2 && player.done) ? 'step-active' : ''}><i>{index+1}</i>{step}{index<2 && <FiArrowRight />}</span>)}<span className="demo-status" role="status">{status}</span></div>
    <div className="terminal-and-result">
      <div className="linux-terminal" aria-label={`${demo.filename} Linux terminal demonstration`}>
        <div className="terminal-chrome"><span className="terminal-lights" aria-hidden="true"><i /><i /><i /></span><span><FiTerminal /> surafel@studio: ~/workbench</span><span>BASH</span></div>
        <div className="terminal-editor"><div className="shell-line"><span className="shell-user">surafel@studio</span><span>:~$</span><span>cat &gt; {demo.filename} &lt;&lt;'JS'</span></div>
          <pre className="demo-code" aria-hidden={!player.done}><code className="code-reserve" aria-hidden="true">{demo.code}</code><code className="code-typed"><Code text={player.code} />{!player.codeComplete && <span className="terminal-cursor" />}</code></pre>
          <div className="heredoc-end" aria-hidden="true">{player.codeComplete ? "JS" : "\u00a0"}</div>
          <div className="shell-line run-command"><span className="shell-user">surafel@studio</span><span>:~$</span><span>{player.commandText}</span>{player.codeComplete && !['running','output','done','error'].includes(player.phase) && <span className="terminal-cursor" />}</div>
        </div>
        <div className="terminal-output" aria-label="Terminal output">
          <div className="terminal-output-label"><span>STDOUT</span><span>{player.done ? 'EXIT 0' : player.error ? 'ERROR' : 'NODE.JS'}</span></div>
          <pre>{player.lines.map((line,index)=><span key={index} className={line.includes('429')?'output-blocked':''}>{line}{'\n'}</span>)}{player.phase==='running' && <span className="running-output"><span className="execution-spinner" /> Executing {demo.filename}…</span>}{player.phase==='ready' && <span className="output-waiting">Waiting for the first keystroke.</span>}{player.error && <span className="output-blocked">{player.error}</span>}{player.done && <span className="output-success">✓ Process completed.</span>}</pre>
        </div>
      </div>
      <div className={`demo-result ${player.done?'result-ready':''}`} aria-label={`${demo.kind==='interface'?'Build board':'Rate limiter'} result`}>
        <div className="result-chrome"><FiCode /><span>THE RESULT</span><span>{player.done ? 'LIVE & INTERACTIVE' : 'BUILDING IN THE TERMINAL'}</span></div>
        {player.done ? demo.kind==='interface' ? <BuildBoard result={player.execution.result} /> : <SystemResult result={player.execution.result} onLimitChange={onLimitChange} /> : <div className="result-placeholder"><WaitingDrawing kind={demo.kind} /><span className="eyebrow">{demo.kind==='interface'?'AN INTERFACE IS TAKING SHAPE.':'A SYSTEM IS COMING ONLINE.'}</span><p>The code runs. The idea comes to life.</p></div>}
      </div>
    </div>
    <div className="demo-toolbar"><span><span className="demo-caption-dot" /> JavaScript runs in your browser. No install needed.</span><div><button onClick={player.togglePause} disabled={!player.started || player.done || reduced || motionPaused || !!player.error} aria-label={`${player.paused?'Resume':'Pause'} ${demo.filename} demo`}>{player.paused?<FiPlay />:<FiPause />}{player.paused?'Resume':'Pause'}</button><button onClick={player.replay} aria-label={`Replay ${demo.filename} demo`}><FiRotateCcw />Replay</button><button onClick={player.skip} disabled={player.done} aria-label={`Show ${demo.filename} result`}>Show result<FiArrowRight /></button></div></div>
  </div>;
}

function TerminalChapter({ kind, reduced, motionPaused }) {
  const [limit,setLimit] = useState(3);
  const demo = useMemo(()=>kind==='interface'?createBoardDemo():createSystemDemo(limit),[kind,limit]);
  return <article className={`terminal-chapter chapter-${kind}`}>
    <div className="terminal-chapter-heading" data-reveal><div><p className="eyebrow">{demo.label}</p><h3>{demo.title}</h3></div><p>{demo.description}</p></div>
    <TerminalPlayer key={`${kind}-${limit}`} demo={demo} reduced={reduced} motionPaused={motionPaused} onLimitChange={setLimit} />
  </article>;
}

export default function TerminalShowcase({ reduced, motionPaused, onToggleMotion }) {
  return <section className="terminal-showcase" id="playground"><div className="page-width">
    <div className="section-heading" data-reveal><div><p className="eyebrow"><span>04</span> / THE LIVE WORKBENCH</p><h2>Less magic.<br />More making.</h2></div><div className="workbench-section-aside"><p>Watch the code take shape, run,<br />and become something you can use.</p><button className="text-link" onClick={onToggleMotion}>{motionPaused ? <FiPlay /> : <FiPause />}{motionPaused ? "Resume page animations" : "Pause page animations"}</button></div></div>
    <TerminalChapter kind="interface" reduced={reduced} motionPaused={motionPaused} />
    <TerminalChapter kind="system" reduced={reduced} motionPaused={motionPaused} />
  </div></section>;
}
