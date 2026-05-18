'use client';
import React, { JSX,useEffect, useState } from 'react';  
import CreateNewMenuItem from '../components/CreateNewMenuItem.tsx';
import DeleteEditMenuItems from '../components/DeleteEditMenuItems.tsx';
import { fetchMenuItems, type MenuItemRow } from "../lib/menuItems.tsx";

import '../css/menu.css';
import '../css/brand-kit.css';

export default function AdminMenuPage(): JSX.Element {
    const [menuItems, setMenuItems] = useState([]);
    const [items, setItems] = useState<MenuItemRow[]>([]);
    useEffect(() => {
      fetchMenuItems().then(setItems).catch(console.error);
    }, []);
    return (
        <div>
            <h1>Admin Menu</h1>
            <DeleteEditMenuItems />
            <CreateNewMenuItem image={''} name={'New Item'} price={'$0.00'} description={'New Item Description'} />
        </div>
    );
}