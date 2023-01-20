import React from 'react';
import {v4 as uuid} from 'uuid';

type Props = {
    titles: string[];
    description: string[][];
}

export default function LayeredList(props: Props) {
    // deconstruct props
    const {titles, description} = props;
    // create a list of <li> elements with the titles
    // and then indent the children under each title
    const listItems = titles.map((title, index) => {
        return (
            <li key={uuid()} className={`ml-2`}>
                {title}
                <ul key={uuid()} className={`list-square ml-8`}>
                    {description[index].map((child) => {
                        return (
                            <li key={uuid()} className={``}>{child}</li>
                        )
                    })}
                </ul>
            </li>
        );
    });

    return (
        <div>
            {listItems}
        </div>
    );
}
