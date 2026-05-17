import type { IconType } from "react-icons/lib";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import {
  SiFastapi,
  SiFirebase,
  SiFlutter,
  SiKotlin,
  SiMongodb,
  SiNextdotjs,
  SiSpringboot,
  SiTailwindcss,
  SiTauri,
} from "react-icons/si";
import {
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaPython,
  FaReact,
  FaRust,
} from "react-icons/fa6";
import { TbBrandCpp } from "react-icons/tb";

type Tab = {
  title: string;
  value: string;
  contents: {
    img: IconType;
    desc: string;
    name: string;
    bgColor: string; // dimmer than the icon color
    iconColor: string;
  }[];
};

export const skillsTabs: Tab[] = [
  {
    title: "Web Development",
    value: "web-development",
    contents: [
      {
        img: BiLogoTypescript,
        desc: "Type-safe JavaScript",
        name: "TypeScript",
        iconColor: "#007ACC",
        bgColor: "#004974",
      },
      {
        img: SiNextdotjs,
        desc: "Meta framework",
        name: "Next.js",
        iconColor: "#ffffff",
        bgColor: "#333232",
      },
      {
        img: FaReact,
        desc: "UI component library",
        name: "React",
        iconColor: "#61DAFB",
        bgColor: "#1a4a5e",
      },
      {
        img: SiSpringboot,
        desc: "Java web framework",
        name: "Spring Boot",
        iconColor: "#6DB33F",
        bgColor: "#375a20",
      },
      {
        img: SiTailwindcss,
        desc: "Utility-first CSS",
        name: "Tailwind",
        iconColor: "#38B2AC",
        bgColor: "#1e5c59",
      },
      {
        img: SiFastapi,
        desc: "High-performance Python API",
        name: "FastAPI",
        iconColor: "#009688",
        bgColor: "#004d40",
      },
      {
        img: FaRust,
        desc: "Systems programming",
        name: "Rust",
        iconColor: "#DEA584",
        bgColor: "#6e4a38",
      },
    ],
  },
  {
    title: "Mobile Development",
    value: "mobile-development",
    contents: [
      {
        img: SiFlutter,
        desc: "Cross-platform UI toolkit",
        name: "Flutter",
        iconColor: "#02569B",
        bgColor: "#013458",
      },
      {
        img: SiKotlin,
        desc: "Modern Android development",
        name: "Kotlin",
        iconColor: "#7F52FF",
        bgColor: "#4a2f94",
      },
      {
        img: SiKotlin,
        desc: "Kotlin Multiplatform",
        name: "KMP",
        iconColor: "#7F52FF",
        bgColor: "#4a2f94",
      },
    ],
  },
  {
    title: "Software and Systems",
    value: "software-and-systems",
    contents: [
      {
        img: FaJava,
        desc: "Enterprise-grade language",
        name: "Java",
        iconColor: "#fff",
        bgColor: "#003359",
      },
      {
        img: TbBrandCpp,
        desc: "High-performance computing",
        name: "C++",
        iconColor: "#fff",
        bgColor: "#003359",
      },
      {
        img: SiTauri,
        desc: "Desktop apps with web tech",
        name: "Tauri",
        iconColor: "#FFC131",
        bgColor: "#997520",
      },
      {
        img: FaDocker,
        desc: "Container platform",
        name: "Docker",
        iconColor: "#2496ED",
        bgColor: "#145182",
      },
      {
        img: FaGitAlt,
        desc: "Version control",
        name: "Git",
        iconColor: "#F05032",
        bgColor: "#7a2515",
      },
      {
        img: FaRust,
        desc: "Systems programming",
        name: "Rust",
        iconColor: "#DEA584",
        bgColor: "#6e4a38",
      },
      {
        img: FaPython,
        desc: "General-purpose language",
        name: "Python",
        iconColor: "#3776AB",
        bgColor: "#1e3d57",
      },
    ],
  },
  {
    title: "Databases",
    value: "databases",
    contents: [
      {
        img: FaDatabase,
        desc: "Enterprise SQL database",
        name: "Oracle",
        iconColor: "#F80000",
        bgColor: "#fff",
      },
      {
        img: SiMongodb,
        desc: "NoSQL database",
        name: "MongoDB",
        iconColor: "#47A248",
        bgColor: "#2c612c",
      },
      {
        img: BiLogoPostgresql,
        desc: "Open source SQL",
        name: "PostgreSQL",
        iconColor: "#336791",
        bgColor: "#1e3c55",
      },
      {
        img: SiFirebase,
        desc: "Backend-as-a-Service",
        name: "Firebase",
        iconColor: "#FFCA28",
        bgColor: "#7a6114",
      },
    ],
  },
];
