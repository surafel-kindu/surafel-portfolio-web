import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi';
import postsData from '../../json/posts.json';
import AppBar from '../SharedComponents/AppBar';

function Block({
  block
}) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;

    case 'p':
      return <p>{block.text}</p>;

    case 'image':
      return <figure><img src={block.src} alt={block.caption || ''} loading="lazy" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;

    case 'gallery':
      return <div className="article-gallery">{block.images.map(img => <figure key={img.src}><img src={img.src} alt={img.caption || ''} loading="lazy" />{img.caption && <figcaption>{img.caption}</figcaption>}</figure>)}</div>;

    case 'code':
      return <pre><code>{block.text}</code></pre>;

    case 'quote':
      return <blockquote>{block.text}</blockquote>;

    case 'list':
      return <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>;

    default:
      return null;
  }
}

export default function BlogPostPage() {
  const {
    slug
  } = useParams();
  const post = postsData.posts.find(item => item.slug === slug);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  return <div className="studio-site article-page"><AppBar /><main className="article-main">
    <Link to="/blog" className="text-link"><FiArrowLeft /> All field notes</Link>
    {post ? <article><p className="eyebrow article-tags">{post.tags.join(' / ')}</p><h1>{post.title}</h1><div className="article-meta"><span>{post.author}</span><span>{post.date}</span><span>{post.readTime}</span></div><img className="article-cover" src={post.cover} alt={post.title} /><div className="article-body">{post.blocks.map((block, i) => <Block key={i} block={block} />)}</div><div className="article-author"><span className="brand-mark">sk</span><div><strong>Surafel Kindu</strong><p>Currently a Software Engineer at <a href="https://testsavant.ai/" target="_blank" rel="noreferrer">TestSavant.AI</a> · Co-Founder at Afroawi</p></div><Link to="/" aria-label="About Surafel"><FiArrowUpRight /></Link></div></article> : <div className="detail-empty"><h1>Note not found.</h1><p>Explore the journal for more stories.</p></div>}
  </main><footer className="studio-footer page-width"><Link className="text-link" to="/">Back to the studio<FiArrowUpRight /></Link><span>© {new Date().getFullYear()} / ALWAYS CURIOUS.</span></footer></div>;
}
