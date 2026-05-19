'use client';

import React, { useCallback, useEffect, useState } from 'react';
import DeleteEditMenuItemsCard from './DeleteEditMenuItemsCard';
import '../css/menu.css';
import { fetchMenuItems, type MenuItemRow } from '../lib/postgres_supabase/menuItems';

type DeleteEditMenuItemsProps = {
  refreshKey?: number;
};

export default function DeleteEditMenuItems({ refreshKey = 0 }: DeleteEditMenuItemsProps) {
  const [menuItems, setMenuItems] = useState<MenuItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenuItems = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchMenuItems()
      .then(setMenuItems)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load menu.')
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadMenuItems();
  }, [loadMenuItems, refreshKey]);

  if (loading) {
    return <p className="menuSection-status">Loading menu…</p>;
  }

  if (error) {
    return <p className="menuSection-status">Could not load menu: {error}</p>;
  }

  if (menuItems.length === 0) {
    return <p className="menuSection-status">No menu items yet.</p>;
  }

  return (
    <div className="menuSection-container">
      <div className="menuItems-grid">
        {menuItems.map((item, index) => (
          <DeleteEditMenuItemsCard
            key={item.id ?? `${item.name}-${index}`}
            item={item}
            onChanged={loadMenuItems}
          />
        ))}
      </div>
    </div>
  );
}
