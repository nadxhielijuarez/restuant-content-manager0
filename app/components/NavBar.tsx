import React from 'react';
import BrandHeading from './brandHeading';
import SquareNavBarLinks from './squareNavBarLinks';
import '../css/brand-kit.css';
import '../css/NavBar.css';

export default function NavBar() {
    return (
        <div className='navBar-container'>
            <BrandHeading />
            <SquareNavBarLinks />
        </div>
    )
}