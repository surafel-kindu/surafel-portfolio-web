// Local fallback data — the site renders fully even when Firestore is
// unreachable. Live data from Firebase overrides these values when available.

import profile from "../asset/profile.JPG";

import securicom from "../asset/works/securicom.png";
import lomi3 from "../asset/works/lomi3.png";
import africrowds from "../asset/works/africrowds.webp";
import equbapp from "../asset/works/equbapp.webp";
import chapa from "../asset/works/chapa.webp";
import tebesa2 from "../asset/works/tebesa2.png";

import worksJson from "../json/works.json";

const DEVICON = "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons";

export const fallbackInfo = {
  fullname: "Surafel Kindu",
  position1: "Software Engineer",
  position2: "UI/UX Designer",
  statement:
    "AI specialist and Senior Full-Stack Engineer at TestSavant.AI, with 8+ years of experience and products reaching 2Million+ people. I test models and agents, create custom n8n nodes, and own Afroawi Technologies.",
  profile: profile,
  resume:
    "/assets/resume/myresume.pdf",
  github: "https://github.com/Surafeljava",
  linkedin: "https://www.linkedin.com/in/surafelk/",
  twitter: "https://twitter.com/surafelkindu",
  instagram: "https://instagram.com/surafelkindu",
  email: "surafelkindu01@gmail.com",
  phone: "+2519 86 214 242",
  location: "Addis Ababa, Ethiopia",
};

// Current roles — always shown at the top of Work Experience,
// merged with (and never replaced by) Firestore projects.
export const currentRoles = [
  {
    id: "testsavant",
    primary: true,
    image: "",
    name: "TestSavant.AI",
    logo: "/images/brands/testsavant.png",
    shortName: "TestSavant",
    title: "Senior Full-Stack Engineer",
    link: "https://testsavant.ai/",
    from: "May 2024",
    to: "Present",
    desc: "Developing and fine-tuning AI models, testing agents, and building security guardrails at TestSavant.AI. Creating custom n8n nodes and community packages, Python SDKs, and TypeScript integrations for AI assurance.",
    techs: ["Django", "Next.js", "n8n", "TensorFlow", "AI Assurance"],
    images: [],
    techIcons: [],
    source: "",
  },
  {
    id: "afroawi",
    image: "afroawi-2.jpg",
    name: "Afroawi Technologies",
    logo: "/images/brands/afroawi.png",
    shortName: "Afroawi",
    title: "Owner & Co-Founder",
    link: "https://afroawi.com/",
    from: "2025",
    to: "Present",
    desc: "I own and co-founded Afroawi Technologies, a technology company building products including Asili, Halt, and Model Arcade Lab. I lead product direction, design, and engineering from concept to release.",
    techs: ["Product", "Engineering", "Strategy"],
    images: ["/images/blog/afroawi-2.jpg"],
    techIcons: [],
    source: "",
  },
];

// Merge current roles with a remote (Firestore) work list, de-duplicated by name.
export const mergeWorks = (remote = []) => {
  const localNames = new Set(currentRoles.map((w) => w.name.toLowerCase()));
  const rest = remote.filter((w) => !localNames.has((w.name || "").toLowerCase()));
  return [...currentRoles, ...rest];
};

const imageMap = {
  "securicom.png": securicom,
  "lomi3.png": lomi3,
  "africrowds.webp": africrowds,
  "equbapp.webp": equbapp,
  "chapa.webp": chapa,
  "tebesa2.png": tebesa2,
};

export const fallbackWorks = mergeWorks(
  worksJson.works.map((w) => ({
    ...w,
    images: [imageMap[w.image]].filter(Boolean),
    techIcons: w.tech_icons || [],
  }))
);

export const fallbackSkills = [
  { id: "react", title: "React", icon: `${DEVICON}/react/react-original.svg` },
  { id: "flutter", title: "Flutter", icon: `${DEVICON}/flutter/flutter-original.svg` },
  { id: "typescript", title: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { id: "python", title: "Python", icon: `${DEVICON}/python/python-original.svg` },
  { id: "nodejs", title: "Node.js", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { id: "firebase", title: "Firebase", icon: `${DEVICON}/firebase/firebase-plain.svg` },
  { id: "tensorflow", title: "TensorFlow", icon: `${DEVICON}/tensorflow/tensorflow-original.svg` },
  { id: "figma", title: "Figma", icon: `${DEVICON}/figma/figma-original.svg` },
];
