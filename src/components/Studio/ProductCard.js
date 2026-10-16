import { FiArrowUpRight } from 'react-icons/fi';

function AsiliArtwork({ product }) {
  return <>
    <div className="asili-landscape"><svg viewBox="0 0 460 220" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.15">{Array.from({ length: 14 }, (_, index) => <path key={index} d={`M-20 ${95 + index * 12} Q95 ${5 + index * 8} 230 ${110 + index * 7} T500 ${110 + index * 11}`} />)}</g><circle cx="355" cy="43" r="20" fill="#e7683e" /></svg></div>
    <img className="asili-brand-logo" src={product.logo} alt="Asili — A pocket agronomist for every farmer" width="597" height="221" loading="lazy" />
    <div className="product-visual-bottom"><span>GROW WITH CONFIDENCE.</span><span>01 — WEB & MOBILE</span></div>
  </>;
}

function HaltArtwork() {
  return <>
    <div className="halt-orbits"><span /><span /><span /><i>↳</i></div>
    <span className="product-wordmark">halt<span className="halt-dot">.</span></span>
    <div className="terminal-caption"><span className="terminal-dot" /> $ pip install halt-rate <span>↵</span></div>
    <div className="product-visual-bottom"><span>ONE POLICY. ANY STACK.</span><span>02 — OPEN SOURCE</span></div>
  </>;
}

function ArcadeArtwork({ product }) {
  return <>
    <div className="arcade-identity">
      <div className="product-visual-top"><span>AFROAWI / {product.category}</span><FiArrowUpRight /></div>
      <div className="arcade-logo-window"><img src={product.logo} alt="Model Arcade Lab" loading="lazy" /></div>
      <span className="arcade-headline">Small models.<br /><span>Real decisions.</span></span>
      <p className="arcade-intro">Five familiar games. Seven model backends.<br />How well can a model choose its next move?</p>
      <div className="arcade-game-list" aria-label="Game environments"><span>2048</span><span>Dino Run</span><span>Chess</span><span>Flappy Bird</span><span>Sudoku</span></div>
      <div className="product-visual-bottom"><span>STATE → OPTIONS → DECISION</span><span>03 — OPEN RESEARCH</span></div>
    </div>
    <div className="arcade-screenshot-wrap"><div className="arcade-browser-frame">
      <div className="arcade-browser-bar" aria-hidden="true"><span><i /><i /><i /></span><span>arcade.afroawi.com</span><FiArrowUpRight /></div>
      <img className="arcade-home-preview" src={product.preview} alt="Model Arcade Lab homepage showing the five-game decision model playground" loading="lazy" width="3560" height="1946" />
    </div><span className="arcade-screen-caption">FIVE GAMES. VISIBLE CHOICES. INSPECTABLE RESULTS.</span></div>
  </>;
}

export default function ProductCard({ product, onSelect }) {
  const arcade = product.id === 'arcade';
  return <article className={`studio-product product-${product.id}`} data-reveal>
    <button className="product-visual" onClick={() => onSelect(product)} aria-label={`Explore ${product.name}`}>
      {!arcade && <div className="product-visual-top"><span>AFROAWI / {product.category}</span><FiArrowUpRight /></div>}
      {arcade ? <ArcadeArtwork product={product} /> : product.id === 'asili' ? <AsiliArtwork product={product} /> : <HaltArtwork />}
    </button>
    <div className="product-caption"><div><h3>{product.name}<span>{product.tagline}</span></h3><p>{product.previewDescription}</p></div>
      <div className="product-caption-actions">{arcade && <a className="text-link arcade-visit-link" href={product.url} target="_blank" rel="noreferrer">Visit the lab<FiArrowUpRight /></a>}
        <button aria-label={product.pitchDeck ? `View deck and ${product.name} details` : `View ${product.name} details`} onClick={() => onSelect(product)} className={product.pitchDeck ? 'text-link asili-details-link' : 'circle-link'}>{product.pitchDeck && 'View deck'}<FiArrowUpRight /></button>
      </div>
    </div>
  </article>;
}
