'use client';

import React, { useCallback, useEffect, useState } from 'react';
import bagelStand from '../images/bagel-stand.png';
import { imageSrc } from '../lib/imageSrc';
import CreateNewFindUsRow from '../components/CreateNewFindUsRow';
import FindUsRow from '../components/findUsRow';
import {
  fetchFindUsRows,
  formatFindUsDate,
  formatFindUsTime,
  type FindUsRow as FindUsRowData,
} from '../lib/postgres_supabase/findUsRows';
import '../css/brand-kit.css';
import '../css/find-us.css';
import '../css/create-new-find-us.css';

export default function AdminFindUsPage(): React.ReactElement {
  const [rows, setRows] = useState<FindUsRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const loadRows = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchFindUsRows()
      .then(setRows)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Failed to load locations.')
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadRows();
  }, [loadRows, refreshKey]);

  function handleRowCreated() {
    setRefreshKey((key) => key + 1);
  }

  return (
    <div className="find-us-page">
      <section className="find-us-hero">
        <img src={imageSrc(bagelStand)} alt="First Stop Bagels stand" />
        <div className="find-us-overlay-card">
          <p className="find-us-kicker">WHERE TO FIND US (ADMIN)</p>

          {loading && <p className="find-us-status">Loading…</p>}
          {error && <p className="find-us-status">{error}</p>}
          {!loading && !error && rows.length === 0 && (
            <p className="find-us-status">No locations yet. Add one below.</p>
          )}
          {rows.map((row) => (
            <FindUsRow
              key={row.id}
              date={formatFindUsDate(row.date)}
              time={formatFindUsTime(row.time)}
              market={row.market_title}
              address={row.market_address}
            />
          ))}
          <CreateNewFindUsRow onCreated={handleRowCreated} />
        </div>
      </section>
    </div>
  );
}
