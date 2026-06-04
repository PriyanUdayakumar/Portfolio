export const profile = {
  name: "Priyan Udayakumar",
  handle: "PRIYAN.U",
  role: "AI & Full-Stack Engineer",
  tagline: "Architecting intelligent systems at the edge of human & machine.",
  phone: "+91 9080655587",
  email: "priyan.u2024ece@sece.ac.in",
  github: "https://github.com/PriyanUdayakumar",
  githubUser: "PriyanUdayakumar",
  linkedin: "https://www.linkedin.com/in/priyan-udayakumar",
  location: "Coimbatore, India",
  avatar: "/dp.jpeg",
};

export const about = [
  "I'm an Electronics & Communication Engineering undergraduate who builds at the intersection of AI, computer vision and full-stack systems.",
  "From AI-based face authentication for public distribution to real-time industrial safety monitoring with YOLOv8, I turn research ideas into shipping products.",
  "I've solved 900+ algorithmic problems, reached the Smart India Hackathon second round, and won intercollege tech fests — always chasing the next hard problem.",
];

export const education = [
  {
    institution: "Sri Eshwar College of Engineering",
    degree: "B.E — Electronics & Communication Engineering",
    score: "CGPA 8.3 (up to 3rd sem)",
    year: "2024 — 2028",
  },
  {
    institution: "Best Matriculation Higher Sec. School",
    degree: "HSC — Higher Secondary",
    score: "87.8%",
    year: "2023 — 2024",
  },
  {
    institution: "Best Matriculation Higher Sec. School",
    degree: "SSLC — Secondary",
    score: "94.6%",
    year: "2021 — 2022",
  },
];

export const internship = {
  title: "AI, Data Analytics & Web Development (Django)",
  org: "NIELIT, Calicut",
  year: "2025",
  points: [
    "Built an AI-driven industrial safety monitoring system using YOLOv8.",
    "Processed live camera feeds with OpenCV for real-time helmet detection.",
    "Logged safety violations through a Django backend with a monitoring dashboard.",
  ],
};

export type SkillNode = { name: string; group: "lang" | "framework" | "data" | "tech" | "tool" };

export const skills: SkillNode[] = [
  { name: "C", group: "lang" },
  { name: "C++", group: "lang" },
  { name: "Java", group: "lang" },
  { name: "Python", group: "lang" },
  { name: "Kotlin", group: "lang" },
  { name: "Flutter", group: "lang" },
  { name: "Spring Boot", group: "framework" },
  { name: "Django", group: "framework" },
  { name: "Gradle", group: "framework" },
  { name: "Maven", group: "framework" },
  { name: "React", group: "framework" },
  { name: "MySQL", group: "data" },
  { name: "MongoDB", group: "data" },
  { name: "SQLite", group: "data" },
  { name: "PostgreSQL", group: "data" },
  { name: "Machine Learning", group: "tech" },
  { name: "Computer Vision", group: "tech" },
  { name: "Web Dev", group: "tech" },
  { name: "Android Dev", group: "tech" },
  { name: "Git & GitHub", group: "tool" },
  { name: "VS Code", group: "tool" },
  { name: "Video Editing", group: "tool" },
];

export const skillGroups: Record<SkillNode["group"], string> = {
  lang: "Languages",
  framework: "Frameworks",
  data: "Databases",
  tech: "Technologies",
  tool: "Tools",
};

export const projects = [
  {
    name: "NextGen PDS",
    subtitle: "AI Public Distribution System",
    tech: ["React 19", "Node.js", "Express", "MongoDB", "JWT", "Python", "OpenCV", "TensorFlow"],
    description:
      "A smart Public Distribution System with AI-based face authentication, QR scanning and voice assistance. Secure role-based access with real-time inventory monitoring.",
    repo: "Programmer",
    highlight: "AI Face Auth",
  },
  {
    name: "Industrial Worker Safety Monitor",
    subtitle: "Real-time YOLOv8 Vision",
    tech: ["Python", "Django", "YOLOv8", "OpenCV", "JavaScript"],
    description:
      "AI industrial safety monitoring built at NIELIT Calicut — YOLOv8 helmet detection on live camera feeds, logging violations via a Django dashboard.",
    repo: "Traffic-Management-System",
    highlight: "YOLOv8",
  },
  {
    name: "Chemical Equipment Visualizer",
    subtitle: "Interactive Engineering Tool",
    tech: ["JavaScript", "Visualization"],
    description:
      "An interactive visualizer for chemical engineering equipment, translating complex apparatus into an explorable interface.",
    repo: "Chemical-Equipment-Visualizer",
    highlight: "Visualization",
  },
  {
    name: "QuickNote — ZeroDay",
    subtitle: "Open-Source Contribution",
    tech: ["JavaScript"],
    description:
      "Contributed to a JavaScript note-taking application by forking and enhancing functionality — collaborative development on an existing codebase.",
    repo: "QuickNote-application-zeroday",
    highlight: "Open Source",
  },
];

export const certifications = [
  { name: "C++ Programming (Spoken Tutorial)", issuer: "IIT Bombay", year: "2024" },
  { name: "Programming in Java EE", issuer: "Red Hat", year: "2025" },
  { name: "C++ Programming", issuer: "Scaler", year: "2024" },
  { name: "Introduction to Machine Learning", issuer: "NPTEL", year: "2025" },
  { name: "Problem Solving (Basics)", issuer: "HackerRank", year: "2025" },
  { name: "JavaScript Fundamentals", issuer: "Udemy", year: "2025" },
  { name: "Mastering DSA using C & C++", issuer: "Udemy", year: "2025" },
];

export const achievements = [
  { title: "Smart India Hackathon 2025", detail: "Shortlisted — Second Round", year: "2025", rank: "SIH" },
  { title: "HackTiVate TiForge Hackathon", detail: "Shortlisted — Finals", year: "2026", rank: "Finalist" },
  { title: "Creatathon — Intercollege Tech Fest", detail: "First Place", year: "2024", rank: "1st" },
  { title: "Freshwarites — Intercollege Tech Fest", detail: "Fifth Place", year: "2024", rank: "5th" },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    stat: "1,577 Rating",
    detail: "250+ problems solved · Global rank 234,793",
    url: "https://leetcode.com/PriyanUdayakumar",
    accent: "gold",
  },
  {
    platform: "HackerRank",
    stat: "5★ C++",
    detail: "3★ C · 2★ 30 Days of Code",
    url: "https://www.hackerrank.com/",
    accent: "cyan",
  },
  {
    platform: "SkillRack",
    stat: "900+ Solved",
    detail: "Daily problem solving streak",
    url: "https://www.skillrack.com/",
    accent: "violet",
  },
] as const;

export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "internship", label: "Internship" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "achievements", label: "Awards" },
  { id: "coding", label: "Coding" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];
