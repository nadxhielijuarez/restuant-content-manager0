import React from 'react';
import bagelStand from '../images/bagel-stand.png';
import { imageSrc } from '../lib/imageSrc';
import FindUsRow from '../components/findUsRow';
import '../css/brand-kit.css';
import '../css/find-us.css';

export default function FindUsPage(): React.ReactElement {
  return (
    <div className="find-us-page">
      <section className="find-us-hero">
        <img src={imageSrc(bagelStand)} alt="First Stop Bagels stand" />
        <div className="find-us-overlay-card"> <p className="find-us-kicker">WHERE TO FIND US</p> 
        
          <FindUsRow date="DATE" time="TIME" market="MARKET" address="ADDRESS" /> <br />
          <FindUsRow date="DATE" time="TIME" market="MARKET" address="ADDRESS" /> <br />        
        
        </div>


      </section>
    </div>
  );
}
