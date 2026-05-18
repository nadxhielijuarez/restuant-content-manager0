import React from 'react';
import BrandHeading from './brandHeading.tsx';
import SquareNavBarLinks from './squareNavBarLinks.tsx';
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