import React from 'react';
import { imageSrc, type ImageImport } from '../lib/imageSrc';
import '../css/menu.css';

type MenuItemProps = {
  key?: React.Key;
  image: ImageImport;
  name: string;
  price: string;
  description: string;
  newProduct?: boolean;
  outOfStock?: boolean;
  id?: number;
};

export default function MenuItem({
  image,
  name,
  price,
  description,
  newProduct,
  outOfStock,
}: MenuItemProps) {
  return (
    <article
      className={`menuItem-card${outOfStock ? ' menuItem-card--out-of-stock' : ''}`}
    >
      <div className="menuItem-imageWrap">
        <img src={imageSrc(image)} alt={name} />
        <h3 className="menuItem-title">{name}</h3>
        {newProduct && <span className="menuItem-badge">NEW</span>}
        {outOfStock && (
          <span className="menuItem-badge menuItem-badge--oos">OUT OF STOCK</span>
        )}
      </div>
      <p className="menuItem-description">{description}</p>
      <p className="menuItem-price">{price}</p>
    </article>
  );
}
