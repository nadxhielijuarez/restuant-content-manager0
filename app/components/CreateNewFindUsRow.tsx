'use client';

import React, { useState } from 'react';
import '../css/find-us.css';
import '../css/create-new-find-us.css';
import { createFindUsRow } from '../lib/postgres_supabase/findUsRows';

type CreateNewFindUsRowProps = {
  onCreated?: () => void;
};

export default function CreateNewFindUsRow({ onCreated }: CreateNewFindUsRowProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [marketTitle, setMarketTitle] = useState('');
  const [marketAddress, setMarketAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createFindUsRow({
        date,
        time,
        market_title: marketTitle,
        market_address: marketAddress,
      });

      setDate('');
      setTime('');
      setMarketTitle('');
      setMarketAddress('');
      onCreated?.();
    } catch (err) {
      console.error('Submit failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to create location.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="createNewFindUsRow-form" onSubmit={handleSubmit}>
      {error && <p className="createNewFindUsRow-error">{error}</p>}
      <div className="find-us-row">
        <div className="find-us-row-field">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="find-us-row-field">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="find-us-row-field">
          <input
            type="text"
            placeholder="market"
            value={marketTitle}
            onChange={(e) => setMarketTitle(e.target.value)}
            required
          />
        </div>

        <div className="find-us-row-field">
          <input
            type="text"
            placeholder="address"
            value={marketAddress}
            onChange={(e) => setMarketAddress(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="createNewFindUsRow-button-container">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create New Row'}
        </button>
      </div>
    </form>
  );
}
