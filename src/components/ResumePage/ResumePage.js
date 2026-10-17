import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import AppBar from '../SharedComponents/AppBar';
import '../../studio.css';
import '../../studio-profile.css';

const resume = '/assets/resume/myresume.pdf';

export default function ResumePage() {
  return <div className="studio-site resume-page"><AppBar /><main className="page-width resume-main">
    <Link className="text-link" to="/"><FiArrowLeft /> Back to portfolio</Link>
    <div className="resume-heading"><div><p className="eyebrow">EXPERIENCE & BACKGROUND</p><h1>My résumé.</h1></div><div className="button-row"><a className="text-link" href={resume} target="_blank" rel="noreferrer">Open PDF<FiArrowUpRight /></a><a className="studio-button" href={resume} download="Surafel-Kindu-Resume.pdf">Download CV<FiDownload /></a></div></div>
    <iframe className="resume-document" src={`${resume}#view=FitH`} title="Surafel Kindu’s updated résumé" />
  </main></div>;
}
