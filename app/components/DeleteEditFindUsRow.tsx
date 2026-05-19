import React from 'react';
import '../css/find-us.css';

type FindUsRowProps = {
  date: string;
  time: string;
  market: string;
  address: string;
}


export default function FindUsRow({ date, time, market, address }: FindUsRowProps) {
  return (
    <>
        <div className="find-us-row">
            <p className="find-us-label">{date} / {time}</p>
            <div className="find-us-details">
                <p className="find-us-title">{market}</p>
                <p className="find-us-address">{address}</p>
            </div>
        </div>
        </>
  );
}
