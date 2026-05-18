import React from 'react';
import bagelStand from '../images/bagel-stand.png';
import { imageSrc } from '../lib/imageSrc';
import '../css/brand-kit.css';
import '../css/find-us.css';

export default function FindUsPage(): React.ReactElement {
  return (
    <div className="find-us-page">
      <section className="find-us-hero">
        <img src={imageSrc(bagelStand)} alt="First Stop Bagels stand" />

        <div className="find-us-overlay-card">
          <p className="find-us-kicker">WHERE TO FIND US</p>

          <div className="find-us-row">
            <p className="find-us-label">DATE / TIME</p>
            <div className="find-us-details">
              <p className="find-us-title">MARKET</p>
              <p className="find-us-address">ADDRESS</p>
            </div>
          </div>

          <div className="find-us-row">
            <p className="find-us-label">DATE/TIME</p>
            <div className="find-us-details">
              <p className="find-us-title">TITLE</p>
              <p className="find-us-address">ADDRESS</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
