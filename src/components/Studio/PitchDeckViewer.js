import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiDownload } from 'react-icons/fi';

export default function PitchDeckViewer({ deck }) {
  const [index, setIndex] = useState(0);
  const slide = deck.slides[index];
  const last = deck.slides.length - 1;

  const onKeyDown = event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      setIndex(current => Math.min(last, Math.max(0, current + (event.key === 'ArrowRight' ? 1 : -1))));
    }
  };

  return <section className="pitch-deck" aria-label="Asili pitch deck" onKeyDown={onKeyDown}>
    <div className="pitch-deck-heading"><div><span className="eyebrow">THE PRODUCT & THE VISION</span><h3>{deck.title}</h3></div><a className="text-link" href={deck.url} target="_blank" rel="noreferrer">Open PDF<FiArrowUpRight /></a></div>
    <figure className="pitch-deck-slide">
      <img key={slide.src} src={slide.src} alt={slide.alt} width="1600" height="900" decoding="async" />
      <figcaption className="sr-only">{slide.title}</figcaption>
    </figure>
    <div className="pitch-deck-controls">
      <div className="pitch-deck-position" aria-live="polite" aria-atomic="true"><span>{String(index + 1).padStart(2, '0')} / {String(deck.slides.length).padStart(2, '0')}</span><strong>{slide.title}</strong></div>
      <div className="pitch-deck-arrows"><button type="button" aria-label="Previous pitch deck slide" disabled={index === 0} onClick={() => setIndex(index - 1)}><FiArrowLeft /></button><button type="button" aria-label="Next pitch deck slide" disabled={index === last} onClick={() => setIndex(index + 1)}><FiArrowRight /></button></div>
    </div>
    <div className="pitch-deck-footer"><span>{deck.slides.length} slides · 2026</span><a href={deck.url} download="Asili-Pitch-Deck-2026.pdf">Download deck<FiDownload /></a></div>
  </section>;
}
