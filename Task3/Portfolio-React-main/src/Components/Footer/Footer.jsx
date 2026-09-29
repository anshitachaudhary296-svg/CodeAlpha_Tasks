import React from 'react';
import './Footer.css';
import { Mail, Phone, Heart, ArrowUp } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="section-container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              Anshita<span className="logo-dot">.</span>
            </a>
            <p className="footer-bio">
              Aspiring Data Analyst & Computer Science Engineer. Dedicated to discovering patterns, 
              building visualizations, and solving analytical challenges.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
            </ul>
          </div>

          <div className="footer-social-group">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="mailto:anshitachaudhary296@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="tel:+917275020999" aria-label="Phone">
                <Phone size={18} />
              </a>
              <a href="https://linkedin.com/in/anshitachaudhary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Anshita Chaudhary. All rights reserved.</p>

          <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
