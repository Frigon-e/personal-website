import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KRCLogo from '../components/KRCLogo'
import {
  faDocker,
  faGithub,
  faGolang,
  faJava,
  faJira,
  faJs,
  faPython
} from '@fortawesome/free-brands-svg-icons';


const Languages = [
  {
    name: 'Python',
    library: ['Django', 'Numpy', 'Pandas', 'Flask'],
    icon: faPython,
    color: 'text-yellow-300',
  },
  {
    name: 'Java',
    library: ['Swing', 'JDBC', 'Junit'],
    icon: faJava,
    color: 'text-red-400',
  },
  {
    name: 'Typescript',
    library: ['React', 'React Native', 'Next.js', 'Tailwind', "Redux"],
    icon: faJs,
    color: 'text-blue-400',
  },
  {
    name: 'Go',
    library: ['Gin', 'Go Routines'],
    icon: faGolang,
    color: 'text-blue-500',
  }
]

const Techs = [
  {
    name: 'Github',
    icon: faGithub,
    color: 'text-gray-400',
  },
  {
    name: 'Docker',
    icon: faDocker,
    color: 'text-blue-400',
  },
  {
    name: 'Jira',
    icon: faJira,
    color: 'text-blue-500',
  }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Lang_Grid = () => {
  return (
    <div
      className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-inherit shadow sm:grid sm:grid-cols-2 sm:gap-1 sm:divide-y-0 sm:pb-1">
      {Languages.map((lang, langID) => (
        <div
          key={lang.name}
          className={classNames(
            langID === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
            langID === 1 ? 'sm:rounded-tr-lg' : '',
            langID === Languages.length - 2 ? 'sm:rounded-bl-lg' : '',
            langID === Languages.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
            'group relative bg-black/30 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <FontAwesomeIcon icon={lang.icon}
                           className={`h-10 w-10 ` + lang.color}/>
          <div className="mt-4">
            <h3 className="text-lg font-medium">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true"/>
              {lang.name}
            </h3>
            <div className="mt-2 text-sm">
              {lang.library.map((lib) => (
                <span key={lib}
                      className="mx-0.5 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  {lib}
                </span>
              ))}

            </div>
          </div>
          {/*<span*/}
          {/*  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"*/}
          {/*  aria-hidden="true"*/}
          {/*>*/}
          {/*  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg"*/}
          {/*       fill="currentColor" viewBox="0 0 24 24">*/}
          {/*    <path*/}
          {/*      d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>*/}
          {/*  </svg>*/}
          {/*</span>*/}

        </div>
      ))}
    </div>
  )
}

const Tech_Grid = () => {
  return (
    <div
      className="border-grey-200 grid grid-cols-3 divide-y-0 overflow-hidden border-t shadow sm:gap-1 sm:rounded-lg sm:border-none sm:pt-0">
      {Techs.map((tech, techID) => (
        <div
          key={tech.name}
          className={classNames(
            techID === 0 ? 'sm:rounded-tl-2xl sm:rounded-bl-2xl' : '',
            techID === 2 ? 'sm:rounded-tr-2xl sm:rounded-br-2xl' : '',
            'group relative bg-black/30 p-6 text-center focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
          )}
        >
          <FontAwesomeIcon icon={tech.icon}
                           className={`h-10 w-10 mx-auto ` + tech.color}/>
          <div className="mt-4">
            <h3 className="text-lg font-medium">
              {/* Extend touch target to entire panel */}
              <span className="absolute inset-0" aria-hidden="true"/>
              {tech.name}
            </h3>
          </div>

        </div>
      ))}
    </div>
  )
}

interface BriefcaseIconProps {
  className: string;
}

function BriefcaseIcon(props: BriefcaseIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100/10 stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-500"
      />
    </svg>
  )
}

function StarIcon({...props}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <path
        className="fill-zinc-100/10 stroke-zinc-500"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  )

}


function CertHistory() {
  const resume: {
    cert_name: string;
    cert_company: string;
    logo: string | typeof KRCLogo;
    issue: string | { label: string; dateTime: number };
    expire: string | { label: string; dateTime: number };
  }[] = [
    {
      cert_name: 'SFA/CPR-C [OFA1] ',
      cert_company: 'Lifesaving Society',
      logo: '/static/logo/lifesavingsocietyIcon.png',
      issue: "Oct 2022",
      expire: "Oct 2025"
    },
    {
      cert_name: 'National Lifeguard Pool',
      cert_company: 'Lifesaving Society',
      logo: '/static/logo/lifesavingsocietyIcon.png',
      issue: 'Jun 2022',
      expire: 'Jun 2024',
    },
    // {
    //   cert_name: 'National Lifeguard Waterpark',
    //   cert_company: 'Lifesaving Society',
    //   logo: '/static/logo/lifesavingsocietyIcon.png',
    //   issue: 'May 2021',
    //   expire: 'May 2023',
    // },
    {
      cert_name: 'RCA Coach',
      cert_company: 'Rowing Canada',
      logo: '/static/logo/RCAIcon.png',
      issue: 'Aug 2019',
      expire: 'Lifetime',
    },
  ]
  return (
    <div className="mt-6 rounded-2xl border border-zinc-700/40 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <StarIcon className="h-6 w-6 flex-none"/>
        <span className="ml-3">Certifications</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div
              className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5">
              {typeof role.logo === 'string' ?
                <Image src={role.logo} alt="" width={1000} height={1000}
                       className="h-7 w-7"/> : <KRCLogo/>}

            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Cert Name</dt>
              <dd
                className="w-full flex-none text-sm font-medium text-zinc-100">
                {role.cert_name}
              </dd>
              <dt className="sr-only">Cert Company</dt>
              <dd className="text-xs text-zinc-400">
                {role.cert_company}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500"
                aria-label={`${typeof role.issue !== "string" ? role.issue.label : role.issue} until ${typeof role.expire !== "string" ? role.expire.label : role.expire
                }`}
              >
                <time
                  dateTime={typeof role.issue !== "string" ? String(role.issue.dateTime) : role.issue}>
                  {typeof role.issue !== "string" ? role.issue.label : role.issue}
                </time>
                {' '}
                <span aria-hidden="true">—</span>{' '}
                <time
                  dateTime={typeof role.expire !== "string" ? String(role.expire.dateTime) : role.expire}>
                  {typeof role.expire !== "string" ? role.expire.label : role.expire}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function WorkHistory() {
  const resume: {
    company: string;
    title: string;
    logo: string | typeof KRCLogo;
    start: string | { label: string; dateTime: number };
    end: string | { label: string; dateTime: number };
  }[] = [
    {
      company: 'Dvele',
      title: 'Web Application Developer',
      logo: '/static/logo/DveleLogo.png',
      start: 'Mid-2023',
      end: 'Present'
    },
    {
      company: 'YMCA of Southern Interior',
      title: 'Head Lifeguard',
      logo: '/static/logo/YMCALogo.png',
      start: '2017',
      end: 'Mid-2023'
    },
    {
      company: 'Kelowna Rowing Club',
      title: 'Head Coach',
      logo: KRCLogo,
      start: '2018',
      end: '2021',
    },
  ]
  return (
    <div className="mt-6 rounded-2xl border border-zinc-700/40 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none"/>
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div
              className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800 shadow-md shadow-zinc-800/5 ring-0 ring-zinc-900/5">
              {typeof role.logo === 'string' ?
                <Image src={role.logo} alt="" width={1000} height={1000}
                       className="h-7 w-7"/> : <KRCLogo/>}

            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd
                className="w-full flex-none text-sm font-medium text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-500"
                aria-label={`${typeof role.start !== "string" ? role.start.label : role.start} until ${typeof role.end !== "string" ? role.end.label : role.end
                }`}
              >
                <time
                  dateTime={typeof role.start !== "string" ? String(role.start.dateTime) : role.start}>
                  {typeof role.start !== "string" ? role.start.label : role.start}
                </time>
                {' '}
                <span aria-hidden="true">—</span>{' '}
                <time
                  dateTime={typeof role.end !== "string" ? String(role.end.dateTime) : role.end}>
                  {typeof role.end !== "string" ? role.end.label : role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}


export default function Home() {
  return (
    <div className={`mt-16 sm:t-32`}>
      <div className={`max-w-2xl`}>
        <h1
          className={`text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl`}>Full Stack Developer and Employable</h1>

        <p className={`mt-6 text-base text-zinc-400`}>Hello, my name is
          <span
            className={`bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}> Ethan Frigon</span>
          . I’m currently working as a full stack software developer at Dvele
          where we build pre-fabricated smart green homes.</p>
        <br/><h2
        className={`py-2 bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl`}>Strongest
        Languages & Technologies:</h2>
      </div>
      <Lang_Grid/>
      <Tech_Grid/>
      <div className={`md:grid md:grid-cols-2 md:gap-1`}>
        <WorkHistory/>
        <CertHistory/>
      </div>
    </div>
  )
}
