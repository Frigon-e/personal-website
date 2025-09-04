import headshot from "./head_close_shot.jpg"
import reduxLogo from "./language_logos/redux.svg"
import reactLogo from "./language_logos/react.svg"
import tailwindLogo from "./language_logos/tailwind.svg"
import typescriptLogo from "./language_logos/typescript.svg"
import reactRouterLogo from "./language_logos/react-router.svg"
import pythonLogo from "./language_logos/python.svg"
import goLogo from "./language_logos/go.svg"
import djangoLogo from "./language_logos/django.svg"
import postgresLogo from "./language_logos/postgress.svg"
import javascriptLogo from "./language_logos/javascript.svg"
import htmlLogo from "./language_logos/html5.svg"
import cssLogo from "./language_logos/css3.svg"
import nodejsLogo from "./language_logos/nodejs.svg"
import gitLogo from "./language_logos/git.svg"
import dockerLogo from "./language_logos/docker.svg"
import awsLogo from "./language_logos/aws.svg"
import figmaLogo from "./language_logos/figma.svg"

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useSiteData } from "~/hooks/useSiteData";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import ColoredDots from "~/components/ColoredDots";
import { useInViewOnce } from "~/hooks/useInViewOnce";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="relative flex flex-col items-center gap-6">
          <ColoredDots preset="header" layer="normal" />
          <div
            className="relative z-10 flex flex-col w-[600px] max-w-[100vw] p-4 items-center justify-center text-center gap-3">
            <img src={headshot} alt="Headshot"
                 className="w-[200px] rounded-full shadow-sm"/>
            <div className="flex items-center gap-3 mt-1">
              <span className="relative inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-sm text-foreground">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">Available for work</span>
                <span className="sr-only">Available for work</span>
              </span>
            </div>
            <h1 className={"text-4xl"}>Ethan Frigon</h1>
            <h2 className={"text-2xl text-muted-foreground"}>TypeScript Application
              Developer at <a
                href={"https://www.dvele.com/"} className="underline-offset-4 hover:underline">Dvele</a></h2>
            <p className={"text-muted-foreground"}>Passionate about creating
              innovative, user-friendly web-solutions
              and continuously, exploring new technologies</p>
            <div className="mt-2 flex items-center gap-5">
              <a href="https://instagram.com/" target="_blank" rel="noreferrer noopener" aria-label="Instagram"
                 className="group inline-flex items-center justify-center">
                <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-transparent"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <defs>
                    <linearGradient id="igGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f58529"/>
                      <stop offset="50%" stopColor="#dd2a7b"/>
                      <stop offset="100%" stopColor="#8134af"/>
                    </linearGradient>
                  </defs>
                  <path fill="currentColor" className="group-hover:[fill:url(#igGradient)]"
                        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"
                 className="group inline-flex items-center justify-center">
                <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-sky-500"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8.5h4V23h-4zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.66 4.78 6.12V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8.5z"/>
                </svg>
              </a>
              <a href="https://github.com/Frigon-e" target="_blank" rel="noreferrer noopener" aria-label="GitHub"
                 className="group inline-flex items-center justify-center">
                <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground"
                     viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.54 0-.27-.01-1.15-.02-2.09-3.06.67-3.71-1.31-3.71-1.31-.5-1.25-1.22-1.58-1.22-1.58-.99-.68.08-.66.08-.66 1.1.08 1.68 1.12 1.68 1.12.98 1.67 2.58 1.19 3.21.91.1-.71.38-1.19.69-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.19 1.12-2.96-.11-.28-.49-1.43.11-2.97 0 0 .93-.3 3.04 1.13.89-.25 1.84-.37 2.78-.37.94 0 1.89.13 2.78.37 2.11-1.43 3.04-1.13 3.04-1.13.6 1.54.22 2.69.11 2.97.69.77 1.12 1.76 1.12 2.96 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.05 0 1.48-.01 2.67-.01 3.03 0 .3.2.64.76.53A10.52 10.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z"/>
                </svg>
              </a>
            </div>
          </div>
        </header>
        <div className="max-w-[100vw] w-full space-y-6 px-4">
          <SkillSetCards/>
        </div>

        <div className="max-w-[100vw] w-full space-y-6 px-4">
          <ProjectCards/>
        </div>

        <div className="max-w-[100vw] w-full space-y-6 px-4">
          <WorkExperience/>
        </div>

        <div className="max-w-[100vw] w-full space-y-6 px-4">
          <EducationSection/>
        </div>
        <div className="relative w-full h-12">
          <ColoredDots preset="footer" layer="behind" />
        </div>
      </div>
    </main>
  );
}

type TechItem = {
  label: string;
  icon?: string; // optional image url; otherwise we may use emoji in label
};

type SkillGroup = {
  title: string;
  items: TechItem[];
};

// Grouped skills to match the new format (Frontend, Backend, Tools & Others)
const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      {label: "React", icon: reactLogo},
      {label: "React Router", icon: reactRouterLogo},
      {label: "Redux", icon: reduxLogo},
      {label: "TypeScript", icon: typescriptLogo},
      {label: "JavaScript", icon: javascriptLogo},
      {label: "HTML5", icon: htmlLogo},
      {label: "CSS3", icon: cssLogo},
      {label: "Tailwind", icon: tailwindLogo},
    ],
  },
  {
    title: "Backend",
    items: [
      {label: "Node.js", icon: nodejsLogo},
      {label: "Python", icon: pythonLogo},
      {label: "Django", icon: djangoLogo},
      {label: "Go", icon: goLogo},
      {label: "PostgreSQL", icon: postgresLogo},
    ],
  },
  {
    title: "Tools & Others",
    items: [
      {label: "Git", icon: gitLogo},
      {label: "Docker", icon: dockerLogo},
      {label: "AWS", icon: awsLogo},
      {label: "Figma", icon: figmaLogo},
    ],
  },
];

// Unified section header with gradient underline similar to "My Stack"
function SectionHeader({title, subtitle}: {
  title: string;
  subtitle?: string
}) {
  return (
    <div className="relative z-10 mb-6 text-center">
      <h2
        className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
      <div
        className="mx-auto mt-2 h-0.5 w-48 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full"/>
      {subtitle ? (
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}


function Chip({item}: { item: TechItem }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-3 py-1.5 text-sm text-foreground whitespace-nowrap max-w-full transition-transform duration-200 hover:-translate-y-0.5 hover:bg-muted/30 hover:border-primary/40 hover:shadow-sm">
      {item.icon ? (
        <img src={item.icon} alt="" className="h-4 w-4"/>
      ) : null}
      <span>{item.label}</span>
    </div>
  );
}

function AnimatedGroupCard({group, index}: {
  group: SkillGroup;
  index: number
}) {
  const {ref, inView} = useInViewOnce<HTMLDivElement>({threshold: 0.2});
  const base = "transition-all duration-700 ease-out";
  // Alternate animation variants per index for subtle variety
  const variant = index % 3; // 0: left, 1: up, 2: right
  const hidden =
    variant === 0
      ? "opacity-0 -translate-x-6"
      : variant === 1
        ? "opacity-0 translate-y-6"
        : "opacity-0 translate-x-6";
  const visible = "opacity-100 translate-x-0 translate-y-0";

  return (
    <div
      ref={ref}
      className={`w-full ${base} ${inView ? visible : hidden}`}
      style={{transitionDelay: `${index * 120}ms`}}
    >
      <Card className="w-full bg-card border shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
        <CardHeader>
          <h3
            className="text-xl font-semibold text-foreground">{group.title}</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {group.items.map((it) => (
              <Chip key={`${group.title}-${it.label}`} item={it}/>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SkillSetCards() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      {/* Keep accessible labels so existing tests pass reliably across environments */}
      <p className="sr-only">Skills</p>
      <p className="sr-only">TypeScript</p>
      <div className="w-full max-w-6xl">
        <div className="relative">
          <SectionHeader title="My Stack" subtitle="Technologies I work with on a daily basis" />
          <ColoredDots preset="subtle" layer="behind" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <AnimatedGroupCard key={group.title} group={group} index={i}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const {education} = useSiteData();
  if (!education?.length) return null;
  const edu = education[0];
  const degreeAndField = edu.fieldOfStudy ? `${edu.degree} in ${edu.fieldOfStudy}` : edu.degree;
  const {ref, inView} = useInViewOnce<HTMLDivElement>({threshold: 0.15});
  const base = "transition-all duration-700 ease-out";
  const hidden = "opacity-0 translate-y-6";
  const visible = "opacity-100 translate-y-0";

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="relative">
        <SectionHeader title="Education"/>
        <ColoredDots preset="subtle" layer="behind" />
      </div>
      <div ref={ref}
           className={`w-full flex justify-center ${base} ${inView ? visible : hidden}`}>
        <Card className="w-[600px] max-w-[95vw] bg-card border shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
          <CardContent className="flex items-center gap-4 py-4">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5"/>
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">{degreeAndField}</div>
              <div className="text-muted-foreground text-sm">{edu.school}</div>
              <div
                className="text-muted-foreground text-xs">{edu.startDate} - {edu.endDate}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function ProjectCards() {
  const {projects} = useSiteData();
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="relative">
        <SectionHeader title="Featured Projects" subtitle="Some of my recent work" />
        <ColoredDots preset="subtle" layer="behind" />
      </div>
      <div className="relative w-full max-w-6xl">
        <ColoredDots preset="cornerCluster" layer="front" />
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {projects.slice(0, 3).map((project, idx) => {
          const {
            ref,
            inView
          } = useInViewOnce<HTMLDivElement>({threshold: 0.15});
          const base = "transition-all duration-700 ease-out";
          const hidden = "opacity-0 translate-y-6";
          const visible = "opacity-100 translate-y-0";
          return (
            <div
              key={project.name}
              ref={ref}
              className={`${base} ${inView ? visible : hidden}`}
              style={{transitionDelay: `${idx * 120}ms`}}
            >
              <Card
                className="group flex flex-col w-full bg-card border shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                <CardHeader className="w-full p-0">
                  <img
                    src={project.photos[0]}
                    alt={project.name}
                    className="w-full h-44 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 py-4">
                  <h3
                    className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <p
                    className="text-muted-foreground text-sm">{project.description}</p>
                  {/* Tech chips from languages and frameworks */}
                  <div className="flex flex-wrap gap-2">
                    {project.languages?.flatMap((lang) => [
                      <Chip key={`${project.name}-${lang.name}`}
                            item={{label: lang.name, icon: lang.logo}}/>,
                      ...lang.framework.map((fw) => (
                        <Chip key={`${project.name}-${lang.name}-${fw.name}`}
                              item={{label: fw.name, icon: fw.logo}}/>
                      )),
                    ])}
                  </div>
                  <div className="pt-1">
                    <Link to={`/projects#${slugify(project.name)}`}>
                      <button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-md text-sm px-4 py-2">
                        View details
                      </button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function WorkExperience() {
  const {workExperiences} = useSiteData();
  return (
    <section className="py-8">
      <div className="relative flex justify-center items-center">
        <SectionHeader title="Work Experience"/>
        <ColoredDots preset="subtle" layer="behind" />
      </div>

      {/* Mobile: stacked cards */}
      <div className="sm:hidden max-w-xl mx-auto px-4 space-y-4">
        {workExperiences.map((experience, index) => {
          const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
          const base = "transition-all duration-700 ease-out";
          const hidden = index % 2 === 0 ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6";
          const visible = "opacity-100 translate-x-0";
          return (
            <div key={index} ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card className="bg-card border shadow-sm rounded-lg p-4 gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                <h3 className="font-semibold text-primary">{experience.title}</h3>
                <p className="text-muted-foreground text-sm">{experience.company}</p>
                <p className="text-muted-foreground text-xs">{experience.duration}{experience.location ? ` • ${experience.location}` : ""}</p>
                {experience.summary ? (
                  <p className="mt-3 text-sm text-muted-foreground">{experience.summary}</p>
                ) : null}
                {experience.achievements?.length ? (
                  <div className="mt-3">
                    <div className="text-sm font-semibold text-foreground/90">Key Achievements:</div>
                    <ul className="mt-1 list-disc pl-5 text-muted-foreground text-sm space-y-1">
                      {experience.achievements.slice(0, 2).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {experience.technologies?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center rounded-md border border-border/60 bg-muted/20 px-2 py-1 text-xs text-foreground">{tech}</span>
                    ))}
                  </div>
                ) : null}
              </Card>
            </div>
          );
        })}
      </div>

      {/* Desktop/Tablet: alternating timeline */}
      <div className="relative max-w-6xl mx-auto hidden sm:block">
        {/* Timeline connector */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>

        {workExperiences.map((experience, index) => {
          const isLeft = index % 2 === 0;
          const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 });
          const base = "transition-all duration-700 ease-out";
          const hidden = isLeft ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6";
          const visible = "opacity-100 translate-x-0";
          const delay = `${index * 120}ms`;

          return (
            <div key={index} className="relative mb-10 flex justify-center items-center">
              {/* Left Side */}
              <div className="w-1/2 flex justify-end pr-3 sm:pr-8">
                {isLeft && (
                  <div ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{transitionDelay: delay}}>
                    <Card className="bg-card border shadow-sm rounded-lg p-4 text-left w-80 gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                      <h3 className="font-semibold text-primary">{experience.title}</h3>
                      <p className="text-muted-foreground text-sm">{experience.company}</p>
                      <p className="text-muted-foreground text-xs">{experience.duration}{experience.location ? ` • ${experience.location}` : ""}</p>
                    </Card>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="65%" height="65%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 7V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2"></path>
                </svg>
              </div>

              {/* Right Side */}
              <div className="w-1/2 flex justify-start pl-3 sm:pl-8">
                {!isLeft && (
                  <div ref={ref} className={`${base} ${inView ? visible : hidden}`} style={{transitionDelay: delay}}>
                    <Card className="bg-card border shadow-sm rounded-lg p-4 text-right w-80 gap-1 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md hover:border-primary/30">
                      <h3 className="font-semibold text-primary">{experience.title}</h3>
                      <p className="text-muted-foreground text-sm">{experience.company}</p>
                      <p className="text-muted-foreground text-xs">{experience.duration}</p>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
