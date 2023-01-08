import Image, {StaticImageData} from 'next/image'
import TicTacToe from "../components/TicTacToe";
import {v4 as uuid} from "uuid";
import {Container} from '../components/Container';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import KRCLogo from '../components/KRCLogo'
import {faDocker, faGithub, faGolang, faJava, faJira, faJs, faPython} from '@fortawesome/free-brands-svg-icons';


const Languges = [
    {
        name: 'Python',
        library: ['Numpy', 'Pandas', 'Selenium', 'BS4'],
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
        library: ['React', 'Next.js', 'Tailwind'],
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
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-inherit shadow sm:grid sm:grid-cols-2 sm:gap-1 sm:pb-1 sm:divide-y-0">
            {Languges.map((lang, langID) => (
                <div
                    key={lang.name}
                    className={classNames(
                        langID === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        langID === 1 ? 'sm:rounded-tr-lg' : '',
                        langID === Languges.length - 2 ? 'sm:rounded-bl-lg' : '',
                        langID === Languges.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                        'relative group bg-black/30 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
                    )}
                >
                    <FontAwesomeIcon icon={lang.icon} className={`h-10 w-10 ` + lang.color}/>
                    <div className="mt-4">
                        <h3 className="text-lg font-medium">
                            {/* Extend touch target to entire panel */}
                            <span className="absolute inset-0" aria-hidden="true"/>
                            {lang.name}
                        </h3>
                        <div className="mt-2 text-sm">
                            {lang.library.map((lib) => (
                                <span key={lib} className="inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {lib}
                    </span>
                            ))}

                        </div>
                    </div>
                    <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path
                  d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
            </svg>
          </span>

                </div>
            ))}
        </div>


    )
}

const Tech_Grid = () => {
    return (
        <div className="divide-y divide-gray-200 overflow-hidden sm:rounded-lg bg-inherit shadow grid grid-cols-3 border-t border-grey-200 sm:border-none sm:pt-0 sm:gap-1 divide-y-0">
            {Techs.map((tech, techID) => (
                <div
                    key={tech.name}
                    className={classNames(
                        techID === 0 ? 'sm:rounded-tl-2xl sm:rounded-bl-2xl' : '',
                        techID === 2 ? 'sm:rounded-tr-2xl sm:rounded-br-2xl' : '',
                        'relative group bg-black/30 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 text-center'
                    )}
                >
                    <FontAwesomeIcon icon={tech.icon} className={`h-10 w-10 mx-auto ` + tech.color}/>
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

function GameDescription() {
    const headers = ['How to win', 'How to play'];
    const descriptions = [['Win by getting 3 in a row in any of the 9 3x3 grids'],
        [['Click on a cell to place your piece.'], ['The next move must be in the grid that corresponds to the cell you clicked on.'], ['If the corresponding board is complete you can place on any board']]];

    const listItems = headers.map((header, index) => {
        return (
            <div key={uuid()} className={`flex flex-col space-y-2`}>
                <h3 key={uuid()} className={`mt-2 text-base bg-gradient-to-tr from-pink-500 to-rose-500 bg-clip-text text-transparent font-bold`}>{header}</h3>
                {descriptions[index].map((description) => {
                    return (
                        <li key={uuid()} className={`text-sm`}>{description}</li>
                    )
                })}
            </div>
        )
    });

    return (
        <>
            <h1 key={uuid()} className={`mt-4 pb-2 text-2xl sm:text-3xl bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Projects</h1>
            <div key={uuid()} className={`mb-6 rounded-2xl border p-6 border-zinc-700/40`}>
                <h2 key={uuid()} className={`text-xl bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Ultimate TicTacToe</h2>
                {listItems}
            </div>
        </>
    );
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
                className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
            <path
                d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
                className="stroke-zinc-400 dark:stroke-zinc-500"
            />
        </svg>
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
            company: 'YMCA of Southern Interior',
            title: 'Head Lifeguard',
            logo: '/static/logo/YMCALogo.png',
            start: '2017',
            end: {
                label: 'Present',
                dateTime: new Date().getFullYear(),
            },
        },
        {
            company: 'Kelowna Rowing Club',
            title: 'Head Coach',
            logo: KRCLogo,
            start: '2018',
            end: '2021',
        },
        {
            company: 'Tim Hortons',
            title: 'Baker',
            logo: '/static/logo/TimHortonsLogo.png',
            start: '2015',
            end: '2017',
        },
        {
            company: 'Central Okanagan Soccer Association',
            title: 'District Referee',
            logo: '/static/logo/COYSALogo.png',
            start: '2012',
            end: '2014',
        },
    ]
    return (
        <div className="mt-6 rounded-2xl bg-black/30 border border-zinc-100 p-6 dark:border-zinc-700/40">
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <BriefcaseIcon className="h-6 w-6 flex-none"/>
                <span className="ml-3">Work</span>
            </h2>
            <ol className="mt-6 space-y-4">
                {resume.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex gap-4">
                        <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                            {typeof role.logo ==='string' ? <Image src={role.logo} alt="" width={0} height={0}  className="h-7 w-7"/> : <KRCLogo/> }

                        </div>
                        <dl className="flex flex-auto flex-wrap gap-x-2">
                            <dt className="sr-only">Company</dt>
                            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {role.company}
                            </dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                                {role.title}
                            </dd>
                            <dt className="sr-only">Date</dt>
                            <dd
                                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                                aria-label={`${typeof role.start !== "string" ? role.start.label : role.start} until ${
                                    typeof role.end !== "string" ? role.end.label : role.end
                                }`}
                            >
                                <time dateTime={typeof role.start !== "string" ? String(role.start.dateTime) : role.start}>
                                    {typeof role.start !== "string" ? role.start.label : role.start}
                                </time>
                                {' '}
                                <span aria-hidden="true">—</span>{' '}
                                <time dateTime={typeof role.end !=="string" ? String(role.end.dateTime) : role.end}>
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
        <>
            <Container>
                <div className={`max-w-2xl`}>
                    <h1 className={`text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl`}>Student, Developer and Employable</h1>

                    <p className={`mt-6 text-base text-zinc-400`}>Hello, my name is
                        <span className={`bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}> Ethan Frigon</span>
                        . I’m currently a fourth year student at Okanagan College. I have experience implementing concepts learned into usable finished projects.</p>
                    <br/><h2 className={`py-2 bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold text-2xl sm:text-3xl`}>Strongest Languages & Technologies:</h2>
                </div>
                <Lang_Grid/>
                <Tech_Grid/>
                <WorkHistory/>
                <GameDescription key={uuid()}/>
                <TicTacToe key={uuid()}/>
            </Container>
        </>
    )
}
