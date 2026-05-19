'use client';

import React, { useEffect, useState } from 'react';
import { imageSrc, type ImageImport } from '../lib/imageSrc';
import {
  deleteMenuItem,
  updateMenuItem,
  type MenuItemRow,
} from '../lib/postgres_supabase/menuItems';
import '../css/menu.css';
import '../css/edit-delete-menu-items.css';

type DeleteEditMenuItemsCardProps = {
  item: MenuItemRow;
  onChanged: () => void;
};

export default function DeleteEditMenuItemsCard({
  item,
  onChanged,
}: DeleteEditMenuItemsCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [newProduct, setNewProduct] = useState(item.new_product ?? false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const image: ImageImport = item.image ?? '';
  const outOfStock = item['out-of-stock'] === true;

  useEffect(() => {
    if (!editing) {
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description);
      setNewProduct(item.new_product ?? false);
    }
  }, [item, editing]);

  function resetForm() {
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setNewProduct(item.new_product ?? false);
    setEditing(false);
    setError(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (item.id == null) return;

    setBusy(true);
    setError(null);
    try {
      await updateMenuItem(item.id, {
        name,
        price,
        description,
        new_product: newProduct,
      });
      setEditing(false);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes.');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (item.id == null) return;
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;

    setBusy(true);
    setError(null);
    try {
      await deleteMenuItem(item.id);
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item.');
    } finally {
      setBusy(false);
    }
  }

  async function handleToggleOutOfStock() {
    if (item.id == null) return;

    setBusy(true);
    setError(null);
    try {
      await updateMenuItem(item.id, { 'out-of-stock': !outOfStock });
      onChanged();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update stock status.'
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className={`menuItem-card${outOfStock ? ' menuItem-card--out-of-stock' : ''}`}>
      <div className="menuItem-imageWrap">
        <img src={imageSrc(image)} alt={name} />
        <h3 className="menuItem-title">{editing ? 'Editing…' : name}</h3>
        {newProduct && !editing && <span className="menuItem-badge">NEW</span>}
        {outOfStock && !editing && (
          <span className="menuItem-badge menuItem-badge--oos">OUT OF STOCK</span>
        )}
      </div>

      {editing ? (
        <form className="menuItem-edit-form" onSubmit={handleSave}>
          <label>
            Title
            <input
              className="menuItem-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Price
            <input
              className="menuItem-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              className="menuItem-edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </label>
          <label className="menuItem-edit-checkbox">
            <input
              type="checkbox"
              checked={newProduct}
              onChange={(e) => setNewProduct(e.target.checked)}
            />
            New product
          </label>
          <div className="menuItem-button-container">
            <button type="submit" className="menuItem-button" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              className="menuItem-button"
              onClick={resetForm}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="menuItem-description">{description}</p>
          <p className="menuItem-price">{price}</p>
          <div className="menuItem-button-container">
            <button
              type="button"
              className="menuItem-button"
              onClick={() => setEditing(true)}
              disabled={busy}
            >
              Edit
            </button>
            <button
              type="button"
              className="menuItem-button menuItem-button--danger"
              onClick={handleDelete}
              disabled={busy}
            >
              Delete
            </button>
            <button
              type="button"
              className="menuItem-button"
              onClick={handleToggleOutOfStock}
              disabled={busy}
            >
              {outOfStock ? 'Mark in stock' : 'Out of stock'}
            </button>
          </div>
        </>
      )}

      {error && <p className="menuItem-card-error">{error}</p>}
    </article>
  );
}
