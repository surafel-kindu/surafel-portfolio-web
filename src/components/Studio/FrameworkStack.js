import { SiDjango, SiReact, SiNextdotjs, SiNodedotjs, SiFlutter, SiTensorflow, SiPytorch, SiPython, SiTypescript } from 'react-icons/si';

const groups = [{
  title: 'AI & agentic workflows',
  items: [
    { name: 'n8n', image: '/images/frameworks/n8n.png', wide: true },
    { name: 'LangChain', image: '/images/frameworks/langchain.svg' },
    { name: 'TensorFlow', Icon: SiTensorflow, color: '#e97a23' },
    { name: 'PyTorch', Icon: SiPytorch, color: '#df5537' }
  ]
}, {
  title: 'Web & backend',
  items: [
    { name: 'React', Icon: SiReact, color: '#087fa4' },
    { name: 'Next.js', Icon: SiNextdotjs, color: '#20231f' },
    { name: 'Django', Icon: SiDjango, color: '#0c4b33' },
    { name: 'Node.js', Icon: SiNodedotjs, color: '#4a873b' }
  ]
}, {
  title: 'Mobile & languages',
  items: [
    { name: 'React Native', Icon: SiReact, color: '#087fa4' },
    { name: 'Flutter', Icon: SiFlutter, color: '#1686bc' },
    { name: 'Python', Icon: SiPython, color: '#3974a0' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' }
  ]
}];

export default function FrameworkStack() {
  return <section className="framework-stack page-width" id="stack" aria-labelledby="framework-heading">
    <div className="framework-heading"><div><p className="eyebrow">FRAMEWORKS & TOOLS</p><h2 id="framework-heading">From models to interfaces.</h2></div><p>The stack I use to build, test, and connect.<br />Custom n8n nodes included.</p></div>
    <div className="framework-groups">{groups.map(group => <div className="framework-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(({ name, image, wide, Icon, color }) => <li key={name}><span className={`framework-icon ${wide ? 'framework-icon-wide' : ''}`} aria-hidden="true">{Icon ? <Icon style={{ color }} /> : <img src={image} alt="" loading="lazy" />}</span><span>{name}</span></li>)}</ul></div>)}</div>
  </section>;
}
