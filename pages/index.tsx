import {Inter} from '@next/font/google'
import TicTacToe from "../components/TicTacToe";
import LayeredList from "../components/LayeredList";
import {v4 as uuid} from "uuid";
import GameDescription from "../components/GameDescription";

export default function Home() {
    return (
        <div key={uuid()} className={`text-gray-300/95 bg-background h-screen w-screen`}>
            <div className={`ml-2 mr-2 mb-8`}>
                <p>Hello, my name is <span className={`bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Ethan Frigon</span>. I’m currently a fourth year student
                    at Okanagan College Kelowna. I have experience implementing concepts learned into usable finished projects.
                    <br/>My <span className={`bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Strongest Languages</span> are:
                </p>
            <LayeredList titles={['Python', 'Java', 'Javascript']} description={[['Numpy', 'Pandas', 'Selenium', 'Beautiful Soup'], ['Swing', 'Junit', 'SQL'], ['React', 'NextJS', 'Tailwind']]}/>
                <p>Understanding of <span className={`bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Technologies Include</span>:</p>
                <LayeredList titles={['Github / Bitbucket', 'Docker', 'Jira / Confuence', 'Apache', 'Traefik Proxy']} description={[[],[],[],[],[]]}/>
            </div>
            <div>

                <GameDescription key={uuid()}/>

                <TicTacToe key={uuid()}/>
            </div>
        </div>

    )
}
