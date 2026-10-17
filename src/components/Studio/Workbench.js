import { useState } from 'react';
import { FiArrowRight, FiPause, FiPlay } from 'react-icons/fi';

const modes = [{
  name: 'Design',
  title: 'Interfaces for real people.',
  copy: 'Web and mobile products built with React, Next.js, and Flutter — from the first interface to the systems behind it.',
  tags: ['React', 'Next.js', 'Flutter']
}, {
  name: 'AI testing',
  title: 'Test models. Challenge agents.',
  copy: 'At TestSavant.AI, I work on model evaluation, agent testing, prompt-injection defenses, and AI security guardrails.',
  tags: ['Model evaluation', 'Agent testing', 'AI security']
}, {
  name: 'Automate',
  title: 'Connect the agentic stack.',
  copy: 'I create custom n8n nodes, community packages, SDKs, and integrations for n8n and other agentic platforms.',
  tags: ['n8n', 'LangChain', 'Custom nodes']
}, {
  name: 'Afroawi',
  title: 'My company. Ideas made real.',
  copy: 'I own Afroawi Technologies, home to Asili, Halt, and Model Arcade Lab. I take products from an idea to a working release.',
  tags: ['Asili', 'Halt', 'Model Arcade Lab']
}];

export default function Workbench({ motionPaused, onToggleMotion }) {
  const [mode, setMode] = useState(1);
  const moduleProps = index => ({
    role: 'button',
    tabIndex: 0,
    'aria-label': `Explore ${modes[index].name}`,
    'aria-pressed': mode === index,
    'aria-controls': 'bench-detail',
    onMouseEnter: () => setMode(index),
    onFocus: () => setMode(index),
    onClick: () => setMode(index),
    onKeyDown: event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setMode(index);
      }
    }
  });
  return <div className="workbench">
    <div className="workbench-label"><span className="status-dot" /> THE BUILDER’S WORKBENCH <span>FIG. 01</span><button className="motion-toggle" onClick={onToggleMotion} aria-pressed={motionPaused} aria-label={motionPaused ? "Resume page animations" : "Pause page animations"}>{motionPaused ? <FiPlay /> : <FiPause />}</button></div>
    <svg className={`workbench-svg mode-${mode}`} viewBox="0 0 640 480" role="group" aria-labelledby="workbench-title">
      <title id="workbench-title">Interactive workbench: design, AI testing, automation, and Afroawi</title>
      <defs><pattern id="iso-grid" width="88" height="50.8" patternUnits="userSpaceOnUse"><path d="M0 0L88 50.8M88 0L0 50.8" stroke="#dadbd6" strokeWidth=".65" /></pattern>
        <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 5L5 0" stroke="#d5d6d0" strokeWidth=".7" /></pattern>
      </defs>
      <path d="M10 270L330 84L632 260L314 446Z" fill="url(#iso-grid)" />
      <g fill="none" stroke="#b8bab2" strokeWidth="1" strokeDasharray="4 5" className="bench-connectors"><path d="M155 245L323 341L491 245M323 341V407M323 146V341" /></g>
      <g {...moduleProps(0)} className="bench-module module-design" transform="translate(65 158)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(60 40) skewY(30) scale(1 .85)" fill="none" stroke="#63695e"><rect width="74" height="47" rx="3" /><path d="M0 10H74M10 18H33V38H10ZM41 19H65M41 26H65M41 33H57" /><circle cx="5" cy="5" r="1" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">INTERFACE / 01</text><circle cx="184" cy="69" r="3" fill={mode === 0 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g {...moduleProps(1)} className="bench-module module-build" transform="translate(216 54)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(69 33) skewY(30)" fill="none" stroke="#393f35" strokeWidth="2"><path d="M12 8L0 18L12 28M44 8L56 18L44 28M34 0L23 34" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">MODELS & AGENTS / 02</text><circle cx="184" cy="69" r="3" fill={mode === 1 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g {...moduleProps(2)} className="bench-module module-ship" transform="translate(367 158)"><g className="bench-float">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V98L104 159V122Z" fill="#eeefea" /><path d="M104 122V159L208 98V61Z" fill="#f8f9f6" />
        <path d="M0 61L104 0L208 61V98L104 159L0 98ZM0 61L104 122L208 61M104 122V159" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <g transform="translate(74 32) skewY(30)" fill="none" stroke="#63695e"><path d="M0 20L26 5L52 20L26 35ZM0 20V43L26 58L52 43V20M26 35V58M13 12L39 28" /><path d="M26 5V19" /></g>
        <text x="16" y="82" transform="skewY(30)" className="svg-label">AUTOMATION / 03</text><circle cx="184" cy="69" r="3" fill={mode === 2 ? '#e7683e' : '#a7b784'} /><g fill="#30372d"><circle cx="4" cy="61" r="1.8" /><circle cx="104" cy="4" r="1.8" /><circle cx="203" cy="61" r="1.8" /></g></g>
      </g>
      <g {...moduleProps(3)} className="bench-core bench-module module-own" transform="translate(216 269)">
        <path d="M0 61L104 0L208 61L104 122Z" fill="#fbfcf9" /><path d="M0 61V91L104 152V122Z" fill="url(#hatch)" /><path d="M104 122V152L208 91V61Z" fill="#f2f3ed" />
        <path d="M0 61L104 0L208 61V91L104 152L0 91ZM0 61L104 122L208 61M104 122V152" fill="none" stroke="#383c35" strokeWidth="1.25" />
        <ellipse className="bench-orbit" cx="104" cy="61" rx="44" ry="25" fill="none" stroke="#d4d7cd" strokeDasharray="2 4" />
        <ellipse className="bench-heart" cx="104" cy="61" rx="14" ry="8" fill="#e7683e" /><text x="16" y="78" transform="skewY(30)" className="svg-label">AFROAWI / 04</text>
        <g fill="#e7683e"><ellipse cx="169" cy="106" rx="2" ry="3" /><ellipse cx="178" cy="101" rx="2" ry="3" /><ellipse cx="187" cy="96" rx="2" ry="3" /></g>
      </g>
    </svg>
    <div className="workbench-bottom"><div role="group" aria-label="Explore my process" className="workbench-tabs">{modes.map((item, i) => <button key={item.name} aria-pressed={mode === i} aria-controls="bench-detail" onClick={() => setMode(i)}>{item.name}<span>0{i + 1}</span></button>)}</div><span className="bench-hint">HOVER A BLOCK · TAP TO EXPLORE</span></div>
    <div className="bench-description" id="bench-detail" aria-live="polite" aria-atomic="true"><strong>{modes[mode].title}</strong><span>{modes[mode].copy}</span><div className="bench-tags">{modes[mode].tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><a href="#playground" className="bench-live-link">Watch code become a product<FiArrowRight /></a>
  </div>;
}

