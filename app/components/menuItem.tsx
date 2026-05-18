import React from 'react';
import { imageSrc, type ImageImport } from '../lib/imageSrc';

type MenuItemProps = {
    key?: React.Key;
    image: ImageImport;
    name: string;
    price: string;
    description: string;
    newProduct?: boolean;
    id?: number;
  };


  export default function MenuItem({
    image,
    name,
    price,
    description,
    newProduct,
    id,
  }: MenuItemProps) {
    return (
      <article className="menuItem-card">
        <div className='menuItem-imageWrap'>
            <img src={imageSrc(image)} alt={name} />
            <h3 className='menuItem-title'>{name}</h3>
            {newProduct && <span className="menuItem-badge">NEW</span>}
        </div>
        <p className="menuItem-description">{description}</p>
        <p className="menuItem-price">{price}</p>
      </article>
    );
  }