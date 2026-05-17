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
  Tensorflow,
  VisualStudioCode,
  TailwindCSS,
  VercelDark,
  Java,
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

export const iconSize = 24;

export const projects: Project[] = [
  {
    href: "https://therap-lms.vercel.app/",
    title: "EduVerse",
    description:
      "AI-powered Learning Management platform with automated course creation, real-time virtual classrooms, forums, and admin analytics",
    thumbnail: eduVerse,
    images: [eduVerse, edu2, edu3, edu4, edu5, edu6, edu7, edu8],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "Spring Boot", Icon: <Spring size={iconSize} /> },
      { name: "Hono", Icon: <NodeJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "Jitsi Meet", Icon: <ViteJS size={iconSize} /> },
    ],
    slug: "eduverse",
    category: "web",
    year: "2024",
    context: "Therap JavaFest",
    content: (
      <div className="space-y-3">
        <p>
          Built during Therap JavaFest — an end-to-end learning management
          platform where instructors can generate entire course curricula using
          AI, host unlimited live video classes via Jitsi Meet, and manage
          student interactions through forums and chatrooms.
        </p>
        <p>
          The admin dashboard provides comprehensive analytics on course
          engagement, student performance, and platform usage. Cloudinary
          handles on-the-fly media optimization for course materials.
        </p>
      </div>
    ),
    features: [
      "AI-driven course creation automating curriculum generation",
      "Unlimited real-time virtual classrooms via Jitsi Meet",
      "Interactive forums and chatrooms for student collaboration",
      "Comprehensive admin analytics dashboard",
      "On-the-fly media optimization with Cloudinary",
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
      "Course Management",
    ],
  },
  {
    github: "https://github.com/ShadmanShafeen/Green-Cycle",
    title: "GreenCycle",
    description:
      "Gamified recycling app with TensorFlow/YOLOv8 object recognition, Gemini-powered guidance, and Firebase push notifications",
    thumbnail: greenCycleLanding,
    images: [greenCycleLanding, greenCycle2, greenCycle3, greenCycle1],
    stack: [
      { name: "Flutter", Icon: <Flutter size={iconSize} /> },
      { name: "Python", Icon: <Python size={iconSize} /> },
      { name: "TensorFlow", Icon: <Tensorflow size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
    ],
    slug: "greencycle",
    category: "mobile",
    year: "2024",
    context: "IEEE QPAIN 2025 Published · SDP-II",
    content: (
      <div className="space-y-3">
        <p>
          A gamified recycling app that uses AI to make waste disposal engaging.
          Point your camera at any object and the TensorFlow + YOLOv8 model
          identifies whether it&apos;s recyclable, what category it belongs to,
          and where to dispose of it.
        </p>
        <p>
          Gemini generates contextual tips and guides. Users earn rewards for
          recycling activities, compete on leaderboards, and connect with local
          recycling vendors. This project was published at the 2025 IEEE QPAIN
          conference.
        </p>
      </div>
    ),
    features: [
      "TensorFlow + YOLOv8 object recognition for waste classification",
      "Gemini AI for dynamic recycling guidance",
      "Gamified reward system with leaderboards",
      "Vendor marketplace connecting recyclers and collectors",
      "Firebase Cloud Messaging for task reminders",
    ],
    pages: [
      "Home",
      "Classify Waste",
      "Find Vendor",
      "Leaderboard",
      "Community",
      "Profile",
    ],
  },
  {
    github: "https://github.com/Abrar118/QuickDev",
    title: "QuickDev",
    description:
      "Desktop developer workspace manager built with Tauri + Rust — persist and restore open files, terminals, and editor sessions instantly",
    thumbnail: elyriaLanding,
    images: [elyriaLanding],
    stack: [
      { name: "Tauri", Icon: <Bash size={iconSize} /> },
      { name: "Rust", Icon: <Bash size={iconSize} /> },
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "SQLite", Icon: <MySQL size={iconSize} /> },
    ],
    slug: "quickdev",
    category: "desktop",
    year: "2025",
    content: (
      <div className="space-y-3">
        <p>
          A Windows PowerToys Workspaces alternative built from scratch with
          Tauri and Rust. Save your entire workspace state — open files,
          terminal sessions, editor windows — and restore them with one click.
        </p>
        <p>
          Uses SQLite to serialize workspace state and user context between
          sessions. Tokio handles asynchronous I/O for seamless UX without
          blocking the UI thread.
        </p>
      </div>
    ),
    features: [
      "Persist and restore complete workspace state",
      "Asynchronous Rust backend via Tokio runtime",
      "SQLite-backed session serialization",
      "Cross-platform native desktop app via Tauri",
    ],
  },
  {
    href: "https://pioneer-mist-two.vercel.app/",
    title: "MIST Pioneers",
    description:
      "AES-encrypted memorial blog for the student movement martyrs, built with MDX content authoring and Velite parsing",
    thumbnail: pioLanding,
    images: [pioLanding, pio1, pio2],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "AES", Icon: <Bash size={iconSize} /> },
      { name: "MDX", Icon: <Markdown size={iconSize} /> },
      { name: "Velite", Icon: <Prettier size={iconSize} /> },
    ],
    slug: "mist-pioneers",
    category: "web",
    year: "2024",
    content: (
      <div className="space-y-3">
        <p>
          A memorial website honoring the brave students who fought for rights
          and justice at MIST. Built as a blog platform where contributors can
          write stories and memories using MDX — Markdown with JSX components
          for rich content.
        </p>
        <p>
          Sensitive memorial data is secured with AES encryption. Velite and
          Rehype handle efficient Markdown parsing and semantic formatting for
          consistent, accessible content presentation.
        </p>
      </div>
    ),
    features: [
      "MDX-based content authoring with JSX components",
      "AES encryption for sensitive memorial data",
      "Velite + Rehype for semantic formatting",
      "Admin dashboard for content management",
    ],
    pages: ["Home", "Blog", "About", "Contact", "Admin Dashboard", "Profile"],
  },
  {
    href: "https://elyria-edu-dev.web.app/",
    title: "Elyria",
    description:
      "Real-time collaborative code editor with project file management, built with Monaco Editor and Socket.IO during BUET DevSprint",
    thumbnail: elyriaLanding,
    images: [elyriaLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Socket.IO", Icon: <ViteJS size={iconSize} /> },
      { name: "Monaco", Icon: <VisualStudioCode size={iconSize} /> },
    ],
    slug: "elyria",
    category: "web",
    year: "2024",
    context: "BUET DevSprint 2024 Finalist",
    content: (
      <div className="space-y-3">
        <p>
          A collaborative development platform built in 24 hours during BUET
          DevSprint 2024 (where our team was a finalist). Multiple developers
          can edit the same codebase in real-time through Monaco Editor with
          Socket.IO syncing changes instantly.
        </p>
        <p>
          Includes project file management, course organization, and integrated
          chatrooms for team communication.
        </p>
      </div>
    ),
    features: [
      "Real-time collaborative code editing via Monaco + Socket.IO",
      "Project file management and organization",
      "Integrated team chatrooms",
      "Course management capabilities",
    ],
    pages: ["Home", "Courses", "Projects", "Code Editor", "Chatrooms"],
  },
  {
    href: "https://rhub-6bde5.web.app/",
    title: "MIST Resource Hub",
    description:
      "Community-driven academic resource archive with structured categorization, search, and cloud-based file management",
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
    category: "web",
    year: "2023",
    content: (
      <div className="space-y-3">
        <p>
          A structured community-based resource platform where students can
          upload, categorize, and discover academic materials — books, slides,
          notes, and past exam papers organized by department, course, and
          semester.
        </p>
        <p>
          Features full-text search, Cloudinary-powered file hosting, and
          Firebase authentication. Used actively by MIST students.
        </p>
      </div>
    ),
    features: [
      "Structured categorization by department and course",
      "Full-text search across all resources",
      "Cloud-based file hosting via Cloudinary",
      "Community upload and curation system",
    ],
    pages: ["Home", "Resources", "Search", "Categories", "Upload", "Profile"],
  },
  {
    github: "https://github.com/Abrar118/Final_bank",
    title: "Bank Management System",
    description:
      "Desktop banking application with AES-encrypted transactions, multi-threaded sessions, and automated JavaMail alerts",
    thumbnail: javaLanding,
    images: [javaLanding, java2, java4, java5],
    stack: [
      { name: "JavaFX", Icon: <Java size={iconSize} /> },
      { name: "Maven", Icon: <Java size={iconSize} /> },
      { name: "JavaMail", Icon: <Java size={iconSize} /> },
    ],
    slug: "bank-system",
    category: "desktop",
    year: "2023",
    context: "SDP-II Course Project",
    content: (
      <div className="space-y-3">
        <p>
          A desktop banking application built with JavaFX for the Software
          Development Project course. Implements secure transaction workflows
          using AES-based data encryption and multi-threaded session handling
          for concurrent customer operations.
        </p>
        <p>
          JavaMail API sends automated transaction alerts, and NIO file-based
          persistence manages account records.
        </p>
      </div>
    ),
    features: [
      "AES-based data encryption for secure transactions",
      "Multi-threaded concurrent customer session handling",
      "Automated transaction alerts via JavaMail API",
      "NIO file-based persistence layer for account records",
    ],
    pages: ["Home", "Accounts", "Transactions", "Email Notifications"],
  },
  {
    href: "https://ai-prompt-ebon.vercel.app/",
    title: "Prompt Finder",
    description:
      "Platform for sharing and discovering AI prompts optimized for ChatGPT, Claude, and other LLMs",
    thumbnail: promptLanding,
    images: [promptLanding],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "Vercel", Icon: <VercelDark size={iconSize} /> },
      { name: "Tailwind", Icon: <TailwindCSS size={iconSize} /> },
    ],
    slug: "prompt-finder",
    category: "web",
    year: "2023",
    content: (
      <div>
        <p>
          A community platform to share and discover complex AI prompts that
          get the best out of large language models. Browse by category, save
          favorites, and contribute your own prompt engineering techniques.
        </p>
      </div>
    ),
    features: [
      "Community-driven prompt sharing and discovery",
      "Category-based browsing and search",
      "Optimized for multiple LLMs",
    ],
    pages: ["Home", "Prompt Listing", "Prompt Details", "Create Prompt"],
  },
  {
    github: "https://github.com/Abrar118/sniff-n-paws",
    title: "Sniff-n-Paws",
    description:
      "Pet foster home management system with daycare scheduling, veterinary tracking, and Oracle database backend",
    thumbnail: sniffPawsLanding,
    images: [sniffPawsLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "Oracle", Icon: <MySQL size={iconSize} /> },
    ],
    slug: "sniff-n-paws",
    category: "web",
    year: "2023",
    context: "DBMS Course Project",
    content: (
      <div>
        <p>
          A web-based management system for a pet foster home, featuring
          daycare scheduling, veterinary record tracking, and adoption
          management. Built with React frontend and Oracle database backend
          as a Database Management System course project.
        </p>
      </div>
    ),
    features: [
      "Daycare scheduling and management",
      "Veterinary record tracking",
      "Adoption management workflow",
      "Oracle DB with complex relational schema",
    ],
    pages: ["Home", "Pets", "Veterinary", "Daycare", "Profile"],
  },
];
