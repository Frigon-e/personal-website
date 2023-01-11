import {Container} from "../../../components/Container";
import TicTacToe from "../../../components/TicTacToe";
import {v4 as uuid} from "uuid";

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

export default function Page() {
    return (
        <Container>
            <GameDescription/>
            <TicTacToe/>
        </Container>

    )
}