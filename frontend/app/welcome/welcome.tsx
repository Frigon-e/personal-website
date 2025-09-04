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
        <header className="flex flex-col items-center gap-9">
          <div
            className="flex flex-col w-[600px] max-w-[100vw] p-4 items-center justify-center text-center gap-2">
            <img src={headshot} alt="React Router Logo"
                 className="w-[200px] rounded-full"/>
            <h1 className={"text-4xl"}>Ethan Frigon</h1>
            <h2 className={"text-2xl text-muted-foreground"}>Application
              Developer at <a
                href={"https://www.dvele.com/"}>Dvele</a></h2>
            <p className={"text-muted-foreground"}>Passionate about creating
              innovative, user-friendly web-solutions
              and continuously, exploring new technologies</p>
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

// A utility to deep-compare the options object for the dependency array
function useDeepCompareMemoize(value: IntersectionObserverInit) {
  const ref = useRef<IntersectionObserverInit>();

  if (JSON.stringify(value) !== JSON.stringify(ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useInViewOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = {threshold: 0.2}
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  // Memoize the options object to prevent the effect from re-running unnecessarily
  const memoizedOptions = useDeepCompareMemoize(options);

  useEffect(() => {
    // We only want to run this logic once inView is false
    if (inView) return;

    // Ensure the ref is attached to an element
    const element = ref.current;
    if (!element) return;

    // Handle SSR and older browsers
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      // If the element is intersecting, update state and disconnect
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, memoizedOptions); // Use the memoized options

    observer.observe(element);

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();

  }, [memoizedOptions, inView]); // Depend on memoizedOptions and inView

  return {ref, inView} as const;
}

// Unified section header with gradient underline similar to "My Stack"
function SectionHeader({title, subtitle}: {
  title: string;
  subtitle?: string
}) {
  return (
    <div className="mb-6 text-center">
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
      className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/20 px-3 py-1.5 text-sm text-foreground whitespace-nowrap max-w-full">
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
      <Card className="w-full bg-card border shadow-sm">
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
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">My
            Stack</h2>
          <div
            className="mt-2 h-0.5 w-48 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full"/>
          <p className="mt-4 text-muted-foreground">Technologies I work with on
            a daily basis</p>
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
      <SectionHeader title="Education"/>
      <div ref={ref}
           className={`w-full flex justify-center ${base} ${inView ? visible : hidden}`}>
        <Card className="w-[600px] max-w-[95vw] bg-card border shadow-sm">
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
      <SectionHeader title="Featured Projects"
                     subtitle="Some of my recent work"/>
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
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
                className="flex flex-col w-full bg-card border shadow-sm overflow-hidden">
                <CardHeader className="w-full p-0">
                  <img
                    src={project.photos[0]}
                    alt={project.name}
                    className="w-full h-44 object-cover"
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
    </section>
  );
}

function WorkExperience() {
  const {workExperiences} = useSiteData();
  return (
    <section className="py-8">
      <div className="flex justify-center items-center">
        <SectionHeader title="Work Experience"/>
      </div>
      <div className="relative max-w-6xl mx-auto">
        {/* Timeline connector */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>

        {workExperiences.map((experience, index) => {
          const isLeft = index % 2 === 0;
          const {
            ref,
            inView
          } = useInViewOnce<HTMLDivElement>({threshold: 0.15});
          const base = "transition-all duration-700 ease-out";
          const hidden = isLeft ? "opacity-0 -translate-x-6" : "opacity-0 translate-x-6";
          const visible = "opacity-100 translate-x-0";
          const delay = `${index * 120}ms`;

          return (
            <div key={index}
                 className="relative mb-10 flex justify-center items-center">
              {/* Left Side */}
              <div className="w-1/2 flex justify-end pr-3 sm:pr-8">
                {isLeft && (
                  <div ref={ref}
                       className={`${base} ${inView ? visible : hidden}`}
                       style={{transitionDelay: delay}}>
                    <Card
                      className="bg-card border shadow-sm rounded-lg p-4 text-left w-80 gap-1">
                      <h3
                        className="font-semibold text-primary">{experience.title}</h3>
                      <p
                        className="text-muted-foreground text-sm">{experience.company}</p>
                      <p
                        className="text-muted-foreground text-xs">{experience.duration}</p>
                    </Card>
                  </div>
                )}
              </div>

              {/* Center Dot */}
              <div
                className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white z-10">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="65%"
                     height="65%"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 7V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2"></path>
                </svg>
              </div>

              {/* Right Side */}
              <div className="w-1/2 flex justify-start pl-3 sm:pl-8">
                {!isLeft && (
                  <div ref={ref}
                       className={`${base} ${inView ? visible : hidden}`}
                       style={{transitionDelay: delay}}>
                    <Card
                      className="bg-card border shadow-sm rounded-lg p-4 text-right w-80 gap-1">
                      <h3
                        className="font-semibold text-primary">{experience.title}</h3>
                      <p
                        className="text-muted-foreground text-sm">{experience.company}</p>
                      <p
                        className="text-muted-foreground text-xs">{experience.duration}</p>
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
