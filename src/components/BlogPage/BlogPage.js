import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import postsData from '../../json/posts.json';
import AppBar from '../SharedComponents/AppBar';
export default function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="studio-site journal-page"><AppBar /><main className="page-width journal-main">
    <Link to="/" className="text-link"><FiArrowLeft /> Back to the studio</Link>
    <div className="journal-page-heading"><p className="eyebrow">THE JOURNAL / FIELD NOTES</p><h1>Thinking out loud<span>.</span></h1><p>What I’m building, learning, and shipping. Products, engineering notes, and everything in between.</p></div>
    <div className="journal-post-grid">{postsData.posts.map(post => <Link key={post.slug} to={`/blog/${post.slug}`} className="journal-feature"><div className="journal-image"><img src={post.cover} alt={post.title} loading="lazy" /><span>{post.tags[0]}<FiArrowUpRight /></span></div><p className="eyebrow">{post.date} <span>·</span> {post.readTime}</p><h2>{post.title}</h2><p>{post.excerpt}</p></Link>)}</div>
  </main><footer className="studio-footer page-width"><Link className="text-link" to="/">Surafel Kindu<FiArrowUpRight /></Link><span>© {new Date().getFullYear()} / ALWAYS CURIOUS.</span></footer></div>;
}
