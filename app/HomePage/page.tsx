'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import '../css/home.css';
import '../css/brand-kit.css';
import mainImage from '../images/main.png';
import SpotlightItem from '../images/spotlight.png';
import { imageSrc } from '../lib/imageSrc';
import MenuSection from '../components/menuSection';



function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}



export default function HomePage(): React.ReactElement {
  const buttonRowRef = useScrollReveal<HTMLDivElement>();
  const headingRef = useScrollReveal<HTMLDivElement>();
  const menuSectionRef = useRef<HTMLDivElement>(null);

  const scrollToMenuSection = (): void => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="mainImage-container">
        <img src={imageSrc(mainImage)} alt="main" />
      </div>
      <div ref={buttonRowRef} className="button-row scroll-reveal">
        <div className ='HomePage-button-row-container'>
          <button type="button" onClick={scrollToMenuSection}>Menu</button>
          <Link href="/FindUs">Where To Find Us</Link>
        </div>
      </div>
      <div ref={headingRef} className="heading-container scroll-reveal">
        <h2>Breaking! Hottest Bagels in Town!</h2>
      </div>
      <div className="spotlight-item-container">
        <img src={imageSrc(SpotlightItem)} alt="spotlight" />
        <div className="spotlight-item-content">
          <h2 className="spotlight-item-title">Everything Bagel</h2>
          <p>A classic bagel with everything you need. A bagel is a type of bread that is made from a dough of flour, water, and yeast. It is then baked in a oven. It is a staple food in many parts of the world.</p>
        </div>
      </div>
      <div ref={menuSectionRef}>
     
      </div>

      
      <section className="find-us-preview" aria-label="Find us preview">
        <div className="find-us-preview-content">
          <h2>
            Your First Stop
            <br />
            for all your bagel needs
            <br />
            <br />
            Awaits
            <br />
            <br />
            Find us
          </h2>
        </div>
      </section>

      <section>
      <div className="find-us-preview-image-wrap">
        <p> New Shop Opening Soon! </p>
          <img src={imageSrc(SpotlightItem)} alt="Baked dish on a tray" />
        </div>
      </section>

      
    </>
  );
}

