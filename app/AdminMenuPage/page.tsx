'use client';

import React, { JSX, useState } from 'react';
import CreateNewMenuItem from '../components/CreateNewMenuItem';
import DeleteEditMenuItems from '../components/DeleteEditMenuItems';
import '../css/menu.css';
import '../css/brand-kit.css';

export default function AdminMenuPage(): JSX.Element {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleMenuChanged() {
    setRefreshKey((key) => key + 1);
  }

  return (
    <div>
      <h1>Admin Menu</h1>
      <DeleteEditMenuItems refreshKey={refreshKey} />
      <CreateNewMenuItem onCreated={handleMenuChanged} />
    </div>
  );
}
