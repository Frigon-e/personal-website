// Centralized site data and types used by loader

// Reuse the same images/assets used in the welcome page
import dvele_project_one from "../welcome/project_photos/dvele_project.png";
import dvele_dashboard from "../welcome/project_photos/dvele_dashboard.png";
import dvele_project_two from "../welcome/project_photos/dvele_project_two.png";
import dveleiq_airquality
  from "../welcome/project_photos/dveleiq_airquality.png";
import homelab from "../welcome/project_photos/homelab.png";
import homelab_two from "../welcome/project_photos/homelab_two.png";
import homelab_three from "../welcome/project_photos/homelab_three.png";

import typescriptLogo from "../welcome/language_logos/typescript.svg";
import javascriptLogo from "../welcome/language_logos/javascript.svg";
import reactLogo from "../welcome/language_logos/react.svg";
import odooLogo from "../welcome/language_logos/odoo.svg";
import postgresLogo from "../welcome/language_logos/postgres.svg";
import reduxLogo from "../welcome/language_logos/redux.svg";
import tailwindLogo from "../welcome/language_logos/tailwind.svg";
import pythonLogo from "../welcome/language_logos/python.svg";
import djangoLogo from "../welcome/language_logos/django.svg";
import golangLogo from "../welcome/language_logos/go.svg";

import battleship_one from "../welcome/project_photos/battleship_one.png";
import battleship_two from "../welcome/project_photos/battleship_two.png";
import battleship_three from "../welcome/project_photos/battleship_three.png";
import gameoflife_one from "../welcome/project_photos/gameoflife_one.png";

export type LanguageSkills = {
  name: string;
  logo: string;
  framework: {
    name: string;
    logo: string;
  }[];
};

export type ProjectInformation = {
  name: string;
  description: string;
  link: string; // legacy field used by Welcome; keep for backward compat
  liveUrl?: string; // preferred URL for the live app/page
  githubUrl?: string; // optional GitHub repository URL
  photos: string[];
  languages: LanguageSkills[];
};

export type WorkExperienceItem = {
  title: string;
  company: string;
  duration: string;
  location?: string;
  summary?: string;
  achievements?: string[];
  technologies?: string[];
};

export type EducationItem = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
};

export const projects: ProjectInformation[] = [
  {
    name: "One Dvele",
    description: "Architected and developed a full-stack, enterprise-grade project management platform acting as the central hub for the entire home-building lifecycle. Built with Django and React, the system features a robust Role-Based Access Control (RBAC) system integrated with AWS Cognito, and a real-time collaboration feed ('The Wall') powered by Django Channels and Redis. I engineered automated workflows that integrate Google Workspace for document generation and DocuSign for electronic signatures, alongside a custom CRM pipeline and asynchronous task processing using Celery to streamline operations across sales, manufacturing, and client services.",
    link: "https://one.dvele.com/",
    liveUrl: "https://one.dvele.com/",
    photos: [dvele_project_one, dvele_dashboard, dvele_project_two],
    languages: [
      {
        name: "TypeScript",
        logo: typescriptLogo,
        framework: [
          {name: "React", logo: reactLogo},
          {name: "Redux", logo: reduxLogo},
          {name: "Tailwind", logo: tailwindLogo},
        ],
      },
      {
        name: "Python",
        logo: pythonLogo,
        framework: [{name: "Django", logo: djangoLogo}],
      },
    ],
  },
  {
    name: "DveleIQ",
    description: "Engineered a comprehensive microservices-based home automation platform bridging local smart environments with the cloud. I developed 'rosie-bridge', a Python service orchestrating bi-directional communication between Home Assistant and AWS IoT Core via MQTT with TLS encryption. On the frontend, I built a React Native mobile application utilizing Redux Toolkit and RTK Query to aggregate real-time data from internal APIs and third-party services like SolarEdge. The architecture includes a resilient time-series data pipeline to AWS Timestream for sensor analytics and automated device provisioning, all deployed within a secure Docker Swarm cluster using Cloudflare Tunnels.",
    link: "https://play.google.com/store/apps/details?id=com.dvele.dveleiq",
    liveUrl: "https://play.google.com/store/apps/details?id=com.dvele.dveleiq",
    photos: [dveleiq_airquality],
    languages: [
      {
        name: "TypeScript",
        logo: typescriptLogo,
        framework: [{name: "React", logo: reactLogo}],
      },
    ],
  },
  {
    name: "Home Server",
    description:
      "Designed and maintained a robust virtualization environment using Proxmox VE, featuring strict network segmentation between internal and external services. The architecture utilizes a dual reverse-proxy setup with Traefik to isolate subnet traffic (192.168.60.x vs 192.168.40.x), protected behind a Cloudflare edge proxy and routed internally via Ubiquiti CyberSecure WAF. I engineered a secure, automated content pipeline where a dedicated processing server handles requests from Jellyseerr and manages data transfer to TrueNAS Scale storage through rigid permission rules. This infrastructure also hosts this personal portfolio via Dokploy.",
    link: "#",
    liveUrl: "#",
    photos: [homelab_two, homelab, homelab_three],
    languages: [],
  },
  {
    name: "Odoo Enterprise Customizations",
    description:
      "A suite of advanced custom modules for Odoo 18 designed to extend core ERP functionality. I architected interactive frontend features using the OWL framework, such as a Sales Performance Dashboard and custom Financial Report filters. On the backend, I implemented high-performance data aggregation using raw SQL queries to bypass ORM overhead for complex KPIs. The project involves sophisticated techniques like monkey-patching the web editor for Loom integration and overriding core ORM methods for robust CRM history tracking.",
    link: "#",
    liveUrl: "#",
    photos: [],
    languages: [
      {
        name: "Python",
        logo: pythonLogo,
        framework: [
          {name: "Odoo 19", logo: odooLogo},
          {name: "PostgreSQL", logo: postgresLogo},
        ],
      },
      {
        name: "JavaScript",
        logo: javascriptLogo,
        framework: [{name: "OWL", logo: odooLogo}],
      },
    ],
  },
  {
    name: "Game Of Life Golang",
    description: "This is a game of life implementation in Golang",
    link: "",
    photos: [gameoflife_one],
    languages: [{
      name: "Go",
      logo: golangLogo,
      framework: [],
    }],
    githubUrl: "https://github.com/Frigon-e/game-programming",
  },
  {
    name: "BattleShip AI",
    description: "This my winning college battleship AI. This was translated from the Java version of the game into a golang equilant.",
    photos: [battleship_one, battleship_two, battleship_three],
    link: "https://github.com/Frigon-e/game-programming",
    languages: [{
      name: "Go",
      logo: golangLogo,
      framework: [],
    }],
    githubUrl: "https://github.com/Frigon-e/battleship-ai",
  }
];

export const workExperiences: WorkExperienceItem[] = [
  {
    title: "Web Application Developer",
    company: "Dvele",
    duration: "2023 - Present",
    location: "Remote / US",
    summary:
      "Lead front-end work on internal platforms and customer-facing apps using TypeScript, React, Redux, React Router, and Tailwind. Partnered closely with design and backend to deliver features end-to-end.",
    achievements: [
      "Drove major refactor and code-splitting initiatives reducing bundle size and improving first load time.",
      "Built shared UI components and patterns that improved delivery speed and consistency across apps.",
      "Collaborated on Python/Django services and API contracts to unblock front-end features.",
      "Improved DX by enhancing tooling, linting, and CI checks for the front-end repo.",
    ],
    technologies: ["TypeScript", "React", "Redux", "React Router", "Tailwind", "Python", "Django"]
  },
  {
    title: "Software Developer",
    company: "Applied Solutions & Consulting",
    duration: "2019 - 2020",
    location: "Kelowna, BC",
    summary:
      "Worked on client projects across the stack, delivering web features from prototype to deployment.",
    achievements: [
      "Implemented responsive UIs and forms, increasing conversion and reducing user error.",
      "Optimized database access and server endpoints to improve page load times.",
      "Integrated third‑party APIs and payment providers into existing applications.",
    ],
    technologies: ["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL"]
  },
  {
    title: "Head Lifeguard",
    company: "YMCA Southern Interior",
    duration: "2017 - 2023",
    location: "Kelowna, BC",
    summary:
      "Led teams to maintain safety and deliver excellent member experience in a high‑traffic facility.",
    achievements: [
      "Trained and mentored new lifeguards; coordinated schedules and daily operations.",
      "Responded to incidents following strict protocols and maintained detailed records.",
      "Recognized for reliability, communication, and calm leadership under pressure.",
    ],
  }
];

export const education: EducationItem[] = [
  {
    school: "Okanagan College",
    degree: "Bachelor of Computer Information Systems",
    fieldOfStudy: "",
    startDate: "2018",
    endDate: "2023",
  }
]

export type SiteData = {
  projects: ProjectInformation[];
  workExperiences: WorkExperienceItem[];
  education: EducationItem[];
};


