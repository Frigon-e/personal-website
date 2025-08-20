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
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "~/components/ui/tooltip";
import { useSiteData } from "~/hooks/useSiteData";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router";

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
          <div className="flex flex-col w-[600px] max-w-[100vw] p-4 items-center justify-center text-center gap-2">
            <img src={headshot} alt="React Router Logo"
                 className="w-[200px] rounded-full"/>
            <h1 className={"text-4xl"}>Ethan Frigon</h1>
            <h2 className={"text-2xl text-muted-foreground"}>Web Application Developer at <a
              href={"https://www.dvele.com/"}>Dvele</a></h2>
            <p className={"text-muted-foreground"}>Passionate about creating innovative, user-friendly web-solutions
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

type LanguageSkills = {
  name: string,
  logo: string,
  framework: {
    name: string,
    logo: string,
  }[]
}

const languages: LanguageSkills[] = [
  {
    name: "TypeScript",
    logo: typescriptLogo,
    framework: [
      {
        name: "React",
        logo: reactLogo,
      },
      {
        name: "React Router",
        logo: reactRouterLogo,
      },
      {
        name: "Redux",
        logo: reduxLogo,
      },
      {
        name: "Tailwind",
        logo: tailwindLogo,
      }
    ]
  },
  {
    name: "Python",
    logo: pythonLogo,
    framework: [
      {
        name: "Django",
        logo: djangoLogo,
      }
    ]
  },
  {
    name: "Go",
    logo: goLogo,
    framework: [
      {
        name: "Gin",
        logo: goLogo,
      }
    ]
  },
  {
    name: "PostgreSQL",
    logo: postgresLogo,
    framework: []
  }

]


function SkillSetCards() {
  return (
    <div className={"flex flex-col items-center justify-center "}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">Skills</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {languages.map((language) => (
          <Card key={language.name}
                className="flex flex-col items-center w-56">
            <CardHeader className="flex flex-col items-center gap-2">
              <img src={language.logo} alt={language.name}
                   className="min-w-10 min-h-10"/>
              <h3 className="text-lg">{language.name}</h3>
            </CardHeader>
            {language.framework.length > 0 &&
              <hr className="w-full border-t border-border"/>}
            <CardContent className="flex items-center gap-2">
              {language.framework.map((framework) => (
                <Tooltip key={framework.name}>
                  <div className="flex items-center gap-2">
                    <TooltipTrigger>
                      <img src={framework.logo} alt={framework.name}
                           className="w-5 h-5"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{framework.name}</p>
                    </TooltipContent>
                  </div>
                </Tooltip>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EducationSection() {
  const { education } = useSiteData();
  if (!education?.length) return null;
  const edu = education[0];
  const degreeAndField = edu.fieldOfStudy
    ? `${edu.degree} in ${edu.fieldOfStudy}`
    : edu.degree;
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Education</h2>
      <div className="w-full flex justify-center">
        <Card className="w-[600px] max-w-[95vw]">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">{degreeAndField}</div>
              <div className="text-muted-foreground text-sm">{edu.school}</div>
              <div className="text-muted-foreground text-xs">{edu.startDate} - {edu.endDate}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProjectCards() {
  const { projects } = useSiteData();
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <h2 className="text-2xl font-bold mb-6 text-foreground">Featured
        Projects</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {projects.map((project) => (
          <Card key={project.name}
                className="flex flex-col items-center w-72 pt-0">
            <CardHeader className="w-full items-center px-0 pt-0">
              <img src={project.photos[0]} alt={project.name}
                   className="w-full min-h-48 max-h-44 object-cover rounded-xl"/>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <h3 className="text-lg">{project.name}</h3>
              <p>{project.description}</p>
              <Link to={`/projects#${slugify(project.name)}`}>
                <button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  View details
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  )
}

function WorkExperience() {
  const { workExperiences } = useSiteData();
  return (
    // Assuming the parent container has a dark background, e.g., bg-gray-900
    <div className="py-8">
      <div className="flex justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-foreground align-middle justify-center">Work Experience</h2>
      </div>
      <div className="relative">
        {/* The timeline connector line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border"></div>

        {workExperiences.map((experience, index) => (
          <div key={index}
               className="relative mb-8 flex justify-center items-center">
            {/* Left Card */}
            <div className="w-1/2 flex justify-end pr-8">
              {index % 2 === 0 && (
                <div
                  className="bg-card rounded-lg shadow-md p-4 text-left w-64 border">
                  <h3
                    className="font-semibold text-primary">{experience.title}</h3>
                  <p className="text-muted-foreground text-sm">{experience.company}</p>
                  <p className="text-muted-foreground text-xs">{experience.duration}</p>
                </div>
              )}
            </div>

            {/* Center Dot */}
            <div
              className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground z-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                   className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M20.25 14.15v4.07a2.25 2.25 0 0 1-2.25 2.25H5.92a2.25 2.25 0 0 1-2.25-2.25v-4.07a2.25 2.25 0 0 1 .527-1.453l4.743-4.21a2.275 2.275 0 0 1 3.12 0l4.743 4.21a2.25 2.25 0 0 1 .527 1.453Z"/>
              </svg>
            </div>

            {/* Right Card */}
            <div className="w-1/2 flex justify-start pl-8">
              {index % 2 !== 0 && (
                <div
                  className="bg-card rounded-lg shadow-md p-4 text-right w-64 border">
                  <h3
                    className="font-semibold text-primary">{experience.title}</h3>
                  <p className="text-muted-foreground text-sm">{experience.company}</p>
                  <p className="text-muted-foreground text-xs">{experience.duration}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
