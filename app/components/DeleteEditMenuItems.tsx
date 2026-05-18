import React from 'react';
import MenuItem from './menuItem.tsx';
import '../css/menu.css';
import bagel1 from '../images/bagel1.png';
import bagel2 from '../images/bagel2.png';
import bagel3 from '../images/bagel3.png';

/* Dummy data, this will be tied to a postgres DB where admin will update/delete/insert new items */

const menuItems = [
    {
        image: bagel1,
        name: 'Everything Bagel',
        price: '$10.99',
        description: 'The savory choice. Bite into happniess.',
        newProduct: true,
        id: 1
    },
    
    {
        image: bagel2,
        name: 'Plain',
        price: '$12.99',
        description: 'An honest classic, with avacado, scrammled eggs, and cheddar cheese.',
        newProduct: false,
        id: 2
    },  
    
    {
        image: bagel3,
        name: 'Plain Jane',
        price: '$5.99',
        description: 'Plain bagel with cream cheese. Perfect safe option.',
        newProduct: false,
        id: 3
    },
]   

export default function DeleteEditMenuItems() {
    return (
        <div className='menuSection-container'>
            <div className='menuItems-grid'>
                {menuItems.map((item) => (
                    <MenuItem key={item.id}
                    id={item.id} 
                    image={item.image} 
                    name={item.name} 
                    price={item.price} 
                    description={item.description} 
                    newProduct={item.newProduct} />
                ))}
            </div>
        </div>
    )
}