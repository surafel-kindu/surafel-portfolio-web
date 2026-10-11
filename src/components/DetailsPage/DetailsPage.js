import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { fallbackWorks } from '../../data/fallback';
import AppBar from '../SharedComponents/AppBar';
export default function DetailsPage() {
  const {
    id
  } = useParams();
  const {
    state
  } = useLocation();
  const local = state?.work || fallbackWorks.find(work => String(work.id) === id);
  const [work, setWork] = useState(local || null);
  const [loading, setLoading] = useState(!local);
  const [currentImage, setCurrentImage] = useState(0);
  const [failedImages, setFailedImages] = useState(false);
  useEffect(() => {
    let mounted = true;
    setWork(state?.work || fallbackWorks.find(item => String(item.id) === id) || null);
    setCurrentImage(0);
    setFailedImages(false);
    setLoading(!state?.work && !fallbackWorks.some(item => String(item.id) === id));
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 6000);
    getDoc(doc(db, 'projects', id)).then(snapshot => {
      if (mounted && snapshot.exists()) {
        const data = snapshot.data();
        const backup = fallbackWorks.find(item => item.name.toLowerCase() === (data.name || '').toLowerCase());
        setWork(previous => ({ ...backup,
          ...previous,
          ...data,
          id
        }));
      }
    }).catch(() => {}).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [id, state]);
  const backup = fallbackWorks.find(item => item.name.toLowerCase() === (work?.name || '').toLowerCase());
  const images = ((failedImages ? backup?.images : work?.images) || []).filter(Boolean);
  const activeImage = Math.min(currentImage, Math.max(0, images.length - 1));
  return <div className="studio-site detail-site"><AppBar /><main className="page-width detail-main">
    <Link to="/" state={{
        scrollTo: 'work'
      }} className="text-link"><FiArrowLeft /> Back to selected work</Link>
    {work ? <>
      <p className="eyebrow detail-eyebrow">IN THE FIELD / {work.from} — {work.to}</p>
      <div className="detail-heading"><div><h1>{work.name}</h1><p>{work.title}</p></div><div className="button-row">{work.link && <a className="studio-button" href={work.link} target="_blank" rel="noreferrer">Visit project<FiArrowUpRight /></a>}{work.source && <a className="text-link" href={work.source} target="_blank" rel="noreferrer"><FiGithub /> Source code</a>}</div></div>
      {images.length > 0 && <div className="detail-gallery"><img src={images[activeImage]} onError={() => setFailedImages(true)} alt={`${work.name} project preview ${activeImage + 1}`} />{images.length > 1 && <div className="detail-thumbnails">{images.map((image, index) => <button key={image + index} onClick={() => setCurrentImage(index)} aria-label={`Show project image ${index + 1}`} aria-pressed={index === activeImage}><img src={image} alt="" onError={() => setFailedImages(true)} /></button>)}</div>}</div>}
      <div className="detail-story"><h2>Behind the build.</h2><div><p>{work.details || work.desc}</p><div className="detail-tags">{work.techs?.map(tech => <span key={tech}>{tech}</span>)}</div></div></div>
    </> : <div className="detail-empty"><h1>{loading ? 'Opening the project…' : 'Project not found.'}</h1><p>{loading ? 'Fetching the details.' : 'Explore the selected work for more projects.'}</p></div>}
  </main></div>;
}
