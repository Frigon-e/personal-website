import React from 'react';
import {v4 as uuid} from "uuid";


export default function GameDescription() {
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
            <h1 key={uuid()} className={`text-2xl bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Projects</h1>
            <h2 key={uuid()} className={`text-xl ml-1 bg-gradient-to-tr from-emerald-400 to-cyan-500 bg-clip-text text-transparent font-bold`}>Ultimate TicTacToe</h2>
            {listItems}
        </div>
    );
};
