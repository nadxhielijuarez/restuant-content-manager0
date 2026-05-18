import React from 'react';
import rollingBagel from '../images/bagel-brand.png';
import { imageSrc } from '../lib/imageSrc';
import '../css/brand-kit.css';


export default function BrandHeading() {
    return (
        <div className='brandHeading-container'>
            <div className='brandHeading-text-container'>
                <h1>First Stop Bagels</h1>
            </div>
            <div className='rollingBagel-container'>
                <img src={imageSrc(rollingBagel)} alt='rollingBagel' />
            </div>
        </div>

    )
}