import React from 'react';
import Link from 'next/link';

export default function squareNavBarLinks() {  
    return (
        <div className='squareNavBar-container'>
            <div className='squareNavBar-text-container'>
                <h3>    some text here, still not sure</h3>
            </div>


            <div className='squareNavBar-links-container'>
                <Link href='/AboutUs'>About</Link>
                <Link href='/FindUs'>Find Us</Link>
                <Link href='/'>Home</Link>             
            </div>

        </div>
    )
}