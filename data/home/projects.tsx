import type { Project } from "@/types/project";
import {
  NextJs,
  NodeJs,
  Cloudinary,
  MongoDB,
  Spring,
  ViteJS,
  Markdown,
  Bash,
  Prettier,
  React,
  ExpressJsDark,
  Firebase,
  Flutter,
  Python,
  OpenAI,
  Tensorflow,
  ClaudeAI,
  VisualStudioCode,
  TailwindCSS,
  VercelDark,
  Java,
  Oracle,
  ESLint,
  MySQL,
} from "developer-icons";

import eduVerse from "@/public/projects/eduverse/landing.png";
import edu2 from "@/public/projects/eduverse/edu2.png";
import edu3 from "@/public/projects/eduverse/edu3.png";
import edu4 from "@/public/projects/eduverse/edu4.png";
import edu5 from "@/public/projects/eduverse/edu5.png";
import edu6 from "@/public/projects/eduverse/edu6.png";
import edu7 from "@/public/projects/eduverse/edu7.png";
import edu8 from "@/public/projects/eduverse/edu8.png";

import greenCycleLanding from "@/public/projects/greencycle/landing.jpg";
import greenCycle1 from "@/public/projects/greencycle/green1.jpg";
import greenCycle2 from "@/public/projects/greencycle/green2.jpg";
import greenCycle3 from "@/public/projects/greencycle/green3.jpg";

import pioLanding from "@/public/projects/pioneers/landing.png";
import pio2 from "@/public/projects/pioneers/pio2.png";
import pio1 from "@/public/projects/pioneers/pio1.png";

import rhubLanding from "@/public/projects/rhub/landing.png";
import rhub1 from "@/public/projects/rhub/rhub1.png";
import rhub2 from "@/public/projects/rhub/rhub2.png";
import rhub3 from "@/public/projects/rhub/rhub3.png";
import rhub4 from "@/public/projects/rhub/rhub4.png";

import javaLanding from "@/public/projects/java/langing.png";
import java2 from "@/public/projects/java/java2.png";
import java5 from "@/public/projects/java/java5.png";
import java4 from "@/public/projects/java/java4.png";

import elyriaLanding from "@/public/projects/landing-elyria.png";
import promptLanding from "@/public/projects/landing-prompt.png";
import sniffPawsLanding from "@/public/projects/foster.png";

export const iconSize = 30;

export const projects: Project[] = [
  {
    href: "https://therap-lms.vercel.app/",
    title: "EduVerse",
    description:
      "An Online Learning Management platform with AI Course Creation and Unlimited online meeting features",
    thumbnail: eduVerse,
    images: [eduVerse, edu2, edu3, edu4, edu5, edu6, edu7, edu8],
    stack: [
      { name: "NextJs", Icon: <NextJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "Jitsi Meet", Icon: <ViteJS size={iconSize} /> },
      { name: "Hono", Icon: <NodeJs size={iconSize} /> },
      { name: "SpringBoot", Icon: <Spring size={iconSize} /> },
    ],
    slug: "eduverse",
    content: (
      <div>
        <p>
          An Online Learning Management platform with AI Course Creation and
          Unlimited online meeting features. The platform includes forums,
          chatrooms, and extensive analytics for administrators. Built during
          Therap JavaFest, it showcases seamless integration of modern web
          technologies.
        </p>
      </div>
    ),
    features: [
      "Course creation with AI assistance",
      "Unlimited online meeting capabilities",
      "Interactive forums and chatrooms",
      "Comprehensive admin analytics",
    ],
    pages: [
      "Home",
      "Courses",
      "Meetings",
      "Forums",
      "Chatrooms",
      "Admin Dashboard",
      "Profile",
      "Newsletters",
      "Settings",
      "About",
      "Contact",
      "Course Management",
    ],
  },
  {
    href: "https://pioneer-mist-two.vercel.app/",
    title: "MIST Pioneers",
    description:
      "A Blog Website for The Martyrs of the Student Movement Memorial Project",
    thumbnail: pioLanding,
    images: [pioLanding, pio1, pio2],
    stack: [
      { name: "NextJs", Icon: <NextJs size={iconSize} /> },
      { name: "AES", Icon: <Bash size={iconSize} /> },
      { name: "Velite", Icon: <Markdown size={iconSize} /> },
      { name: "Rehype", Icon: <Prettier size={iconSize} /> },
    ],
    slug: "mist-pioneers",
    content: (
      <div>
        <p>
          Honoring the brave students who fought for rights and justice at
          Military Institute of Science and Technology. A website for creating
          stories and memories as blogs using modern web technologies and secure
          content management.
        </p>
      </div>
    ),
    features: [
      "Secure and encrypted content management",
      "AES encryption for data security",
      "Markdown and Rehype for content/ code formatting",
      "Velite for efficient Markdown parsing",
    ],
    pages: ["Home", "Blog", "About", "Contact", "Admin Dashboard", "Profile"],
  },
  {
    href: "https://rhub-6bde5.web.app/",
    title: "MIST Central Resource Hub",
    description:
      "A resource management archive for students of universities and colleges",
    thumbnail: rhubLanding,
    images: [rhubLanding, rhub2, rhub3, rhub4, rhub1],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Express", Icon: <ExpressJsDark size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
    ],
    slug: "resource-hub",
    content: (
      <div>
        <p>
          A structured community-based resource storing website which
          categorizes materials intuitively and enables students to find
          academic books and slides efficiently. Features comprehensive search
          and organization systems.
        </p>
      </div>
    ),
    features: [
      "Comprehensive resource management",
      "Structured categorization of materials",
      "Efficient search and organization systems",
      "Community-based resource storing",
    ],
    pages: [
      "Home",
      "Resources",
      "Search",
      "Categories",
      "Upload",
      "Profile",
      "Settings",
      "About",
      "Contact",
    ],
  },
  {
    github: "https://github.com/ShadmanShafeen/Green-Cycle",
    title: "GreenCycle",
    description: "A Gamified Recycling App with AI-powered object recognition",
    thumbnail: greenCycleLanding,
    images: [greenCycleLanding, greenCycle2, greenCycle3, greenCycle1],
    stack: [
      { name: "Flutter", Icon: <Flutter size={iconSize} /> },
      { name: "Python", Icon: <Python size={iconSize} /> },
      { name: "OpenCV", Icon: <OpenAI size={iconSize} /> },
      { name: "TensorFlow", Icon: <Tensorflow size={iconSize} /> },
      { name: "Gemini", Icon: <ClaudeAI size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
    ],
    slug: "greencycle",
    content: (
      <div>
        <p>
          A Recycling app for the contemporary generation which focuses on a
          gamified UI and reward base approach for environmental activities.
          Features Object Recognition and AI-powered text generation.
        </p>
      </div>
    ),
    features: [
      "Object Recognition",
      "AI-powered text generation",
      "Reward-based environmental activities",
    ],
    pages: [
      "Home",
      "Level Tracking",
      "Classify Waste",
      "Find Vendor",
      "Play Games",
      "Waste Item Listing",
      "Community",
      "Profile",
      "Settings",
    ],
  },
  {
    href: "https://elyria-edu-dev.web.app/",
    title: "Elyria",
    description:
      "A Code and Project Management Website with real-time collaboration",
    thumbnail: elyriaLanding,
    images: [elyriaLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "NodeJs", Icon: <NodeJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "SocketIo", Icon: <ViteJS size={iconSize} /> },
      { name: "Monaco", Icon: <VisualStudioCode size={iconSize} /> },
    ],
    slug: "elyria",
    content: (
      <div>
        <p>
          A website featuring real-time code editing with multiple team members,
          project file management, and course management capabilities. Built
          during Devsprint BUET using modern web technologies.
        </p>
      </div>
    ),
    features: [
      "Real-time code editing",
      "Project file management",
      "Course management capabilities",
      "Course management capabilities",
    ],
    pages: [
      "Home",
      "Courses",
      "Projects",
      "Chatrooms",
      "Code Editor",
      "Profile",
      "Settings",
      "About",
      "Contact",
    ],
  },
  {
    href: "https://ai-prompt-ebon.vercel.app/",
    title: "Prompt Finder",
    description: "An AI Powered Prompt Sharing Website",
    thumbnail: promptLanding,
    images: [promptLanding],
    stack: [
      { name: "NextJs", Icon: <NextJs size={iconSize} /> },
      { name: "Vercel", Icon: <VercelDark size={iconSize} /> },
      { name: "Tailwind", Icon: <TailwindCSS size={iconSize} /> },
    ],
    slug: "prompt-finder",
    content: (
      <div>
        <p>
          A platform to share all those big and complicated AI prompts that
          efficiently brings out the best of large language models like ChatGPT,
          Claude, Copilot and others.
        </p>
      </div>
    ),
    features: [
      "AI Prompt Sharing",
      "Efficiently brings out the best of large language models",
    ],
    pages: [
      "Home",
      "Prompt Listing",
      "Prompt Details",
      "Create Prompt",
      "Profile",
    ],
  },
  {
    github: "https://github.com/Abrar118/Final_bank",
    title: "Bank Management System",
    description: "A comprehensive banking system with JavaFX interface",
    thumbnail: javaLanding,
    images: [javaLanding, java2, java4, java5],
    stack: [
      { name: "JavaFX", Icon: <ESLint size={iconSize} /> },
      { name: "Maven", Icon: <Oracle size={iconSize} /> },
      { name: "Java", Icon: <Java size={iconSize} /> },
    ],
    slug: "bank-system",
    content: (
      <div>
        <p>
          A desktop banking application built with JavaFX that provides complete
          banking operations management. Features include transaction handling,
          account management, and automated email notifications.
        </p>
      </div>
    ),
    features: [
      "Transaction handling",
      "Account management",
      "Automated email notifications",
    ],
    pages: [
      "Home",
      "Accounts",
      "Transactions",
      "Email Notifications",
      "Profile",
      "Settings",
    ],
  },
  {
    github: "https://github.com/Abrar118/sniff-n-paws",
    title: "Sniff-n-paws",
    description: "A Foster Home for Pets with comprehensive management system",
    thumbnail: sniffPawsLanding,
    images: [sniffPawsLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Oracle", Icon: <Oracle size={iconSize} /> },
      { name: "NodeJs", Icon: <NodeJs size={iconSize} /> },
      { name: "MySQL", Icon: <MySQL size={iconSize} /> },
    ],
    slug: "sniff-n-paws",
    content: (
      <div>
        <p>
          A web-based management system for a pet foster home, featuring daycare
          scheduling and veterinary management. Built with React frontend and
          Oracle database backend.
        </p>
      </div>
    ),
    features: [
      "Daycare scheduling",
      "Veterinary management",
      "Comprehensive pet management system",
    ],
    pages: ["Home", "Pets", "Veterinary", "Daycare", "Profile", "Settings"],
  },
];
