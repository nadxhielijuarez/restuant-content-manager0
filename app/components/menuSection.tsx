'use client';

import React, { useEffect, useState } from 'react';
import MenuItem from './menuItem';
import '../css/menu.css';
import placeholderImage from '../images/placeholderImage.png';
import { fetchMenuItems, type MenuItemRow } from '../lib/postgres_supabase/menuItems';

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuItems().then(setMenuItems)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load menu.')
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="menuSection-container">
        <p className="menuSection-status">Loading menu…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menuSection-container">
        <p className="menuSection-status">Could not load menu: {error}</p>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="menuSection-container">
        <p className="menuSection-status">No menu items yet.</p>
      </div>
    );
  }

  return (
    <div className="menuSection-container">
      <div className="menuItems-grid">
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id ?? `${item.name}-${index}`}
            id={item.id}
            image={item.image ?? placeholderImage}
            name={item.name}
            price={item.price}
            description={item.description}
            newProduct={item.new_product ?? false}
            outOfStock={item['out-of-stock'] === true}
          />
        ))}
      </div>
    </div>
  );
}
