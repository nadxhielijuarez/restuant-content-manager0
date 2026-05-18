import React, {JSX} from 'react';

type HistoryLineProps = {
    year: number;
    description: string;
}

export default function HistoryLine({year, description}: HistoryLineProps): JSX.Element {
    return ( 
    <>
        <div className = 'history-line'>
            <div className = 'history-year'>
                {year}
            </div>

            <div className = 'history-description'> 
                <p> {description}</p>
            </div>

        </div>    
    </>
    )
}