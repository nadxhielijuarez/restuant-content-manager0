import React, { JSX } from 'react';
import HistoryLine from '../components/historyLine.tsx';
import ownerImage from '../images/owner.png';
import bagelStand from '../images/bagel-stand.png';
import about1 from '../images/about1.png';
import about2 from '../images/about2.png';
import MeetTheTeamCard from '../components/meetTheTeamCard.tsx';
import teamMemberPlaceholder from '../images/teammember-placeholder.png';
import { imageSrc } from '../lib/imageSrc';
import '../css/about-us.css';
import '../css/brand-kit.css';

/** will be replaced with data from postgres database, admin will be able to update info */

const teamMembers = [
  {
    image: teamMemberPlaceholder,
    name: 'John Doe',
    title: 'Team Member 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: 1,
  },
  {
    image: teamMemberPlaceholder,
    name: 'Mary Doe',
    title: 'Team Member 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: 2,
  },
  {
    image: teamMemberPlaceholder,
    name: 'Juan Doe',
    title: 'Team Member 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: 3,
  },
  {
    image: teamMemberPlaceholder,
    name: 'Maria Doe',
    title: 'Team Member 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    id: 4,
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <div className="about-page">
      <header>
        <div className="heading-banner">
          <h2>Satisfying your bagel cravings today!</h2>
        </div>
      </header>

      <section className="about-split owner-history-section">
        <div className="history-section">
          <h2 className="about-section-label">RECOGNITION</h2>
          <HistoryLine year={2025} description="Founded" />
          <HistoryLine
            year={2026}
            description="continuing to spread the bagel goodness"
          />
        </div>

        <div className="founder-column">
          <div className="founder-photo-wrap">
            <img src={imageSrc(ownerImage)} alt="Mel B., founder" />
            <div className="founder-card">
              <span className="founder-badge">FOUNDER</span>
              <p className="founder-name">Melissa Blanco</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-split shop-contact">
        <div className="shop-photo-column">
          <img src={imageSrc(about1)} alt="First Stop Bagels interior" />
        </div>

        <div className="contact-column">
          <h2 className="about-section-label about-section-label--on-dark">CONTACT</h2>
          <dl className="contact-rows">
            <div className="contact-row">
              <dt>Phone</dt>
              <dd>415-555-4567</dd>
            </div>
            <div className="contact-row">
              <dt>email</dt>
              <dd>hello@figma.com</dd>
            </div>
            <div className="contact-row">
              <dt>social</dt>
              <dd>@figma</dd>
            </div>
          </dl>
          <p className="contact-established">Est.2025</p>
        </div>
      </section>

      <section className="meet-the-team-section" aria-label="Meet the team">
        {teamMembers.map((teamMember) => (
          <MeetTheTeamCard
            id={teamMember.id}
            image={teamMember.image}
            name={teamMember.name}
            title={teamMember.title}
            description={teamMember.description}
          />
        ))}
      </section>
    </div>
  );
}