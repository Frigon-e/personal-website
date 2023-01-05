import TicTacToe from "../components/TicTacToe";
import {v4 as uuid} from "uuid";
import {Container} from '../components/Container';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-inherit shadow grid grid-cols-3 sm:gap-1 divide-y-0">
            {Techs.map((tech, techID) => (
                <div
                    key={tech.name}
                    className={classNames(
                        techID === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        techID === 1 ? 'sm:rounded-tr-lg' : '',
                        techID === Techs.length - 2 ? 'sm:rounded-bl-lg' : '',
                        techID === Techs.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
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
        [['Click on a cell to place your piece.'],['The next move must be in the grid that corresponds to the cell you clicked on.'], ['If the corresponding board is complete you can place on any board']]];

    const listItems = headers.map((header, index) => {
        return (
            <div key={uuid()} className={`flex flex-col ml-3`}>
                <h3 key={uuid()} className={`text-base bg-gradient-to-tr from-pink-500 to-rose-500 bg-clip-text text-transparent font-bold`}>{header}</h3>
                {descriptions[index].map((description) => {
                        return (
                            <li key={uuid()} className={`text-sm`}>{description}</li>
                        )
                    })}
            </div>
        )
    });

    return (
        <div key={uuid()} className={`mt-8 mb-8 mr-2 ml-2`}>
            <h1 key={uuid()} className={`text-2xl sm:text-3xl bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Projects</h1>
            <h2 key={uuid()} className={`text-xl ml-1 bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Ultimate TicTacToe</h2>
            {listItems}
        </div>
    );
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
                <GameDescription key={uuid()}/>
                <TicTacToe key={uuid()}/>
            </Container>
        </>
    )
}
