// Centralized site data and types used by loader

// Reuse the same images/assets used in the welcome page
import dvele_project_one from "../welcome/project_photos/dvele_project.png";
import dvele_dashboard from "../welcome/project_photos/dvele_dashboard.png";
import dvele_project_two from "../welcome/project_photos/dvele_project_two.png";
import dveleiq_airquality from "../welcome/project_photos/dveleiq_airquality.png";
import homelab from "../welcome/project_photos/homelab.png";

import typescriptLogo from "../welcome/language_logos/typescript.svg";
import reactLogo from "../welcome/language_logos/react.svg";
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
    description:
      "One Dvele is a web application that is created to help be a centralized hub for Dvele employees to find information",
    link: "https://one.dvele.com/",
    liveUrl: "https://one.dvele.com/",
    photos: [dvele_project_one, dvele_dashboard, dvele_project_two],
    languages: [
      {
        name: "TypeScript",
        logo: typescriptLogo,
        framework: [
          { name: "React", logo: reactLogo },
          { name: "Redux", logo: reduxLogo },
          { name: "Tailwind", logo: tailwindLogo },
        ],
      },
      {
        name: "Python",
        logo: pythonLogo,
        framework: [{ name: "Django", logo: djangoLogo }],
      },
    ],
  },
  {
    name: "DveleIQ",
    description:
      "This is a smart home application including a smart light bulb, smart thermostat, and smart door lock support.",
    link: "https://play.google.com/store/apps/details?id=com.dvele.dveleiq",
    liveUrl: "https://play.google.com/store/apps/details?id=com.dvele.dveleiq",
    photos: [dveleiq_airquality],
    languages: [
      {
        name: "TypeScript",
        logo: typescriptLogo,
        framework: [{ name: "React", logo: reactLogo }],
      },
    ],
  },
  {
    name: "Home Server",
    description:
      "This is a home server that is use to host my personal projects, NAS and other services.",
    link: "",
    photos: [homelab],
    languages: [],
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
  },
  {
    title: "Software Developer",
    company: "Applied Solutions & Consulting",
    duration: "2019 - 2020",
  },
  {
    title: "Head Lifeguard",
    company: "YMCA Southern Interior ",
    duration: "2017 - 2023",
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


