import React from 'react';
import './Hero.css';
import profile_img from '../../assets/anshitapic.jpg';
import { ArrowRight, FileText, Database, BarChart2, Code, Mail, Layout } from 'lucide-react';

const Hero = ({ onOpenResumeModal }) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background-glow"></div>
      
      <div className="section-container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>Seeking Data Analyst & Frontend Developer Roles</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Anshita Chaudhary</span>
          </h1>
          
          <h2 className="hero-subtitle">
            Data Analyst | Frontend Developer
          </h2>

          <p className="hero-description">
            Passionate about transforming raw data into actionable insights and creating clean, responsive web user interfaces. 
            Skilled in <strong>Data Analytics (Python, SQL, Tableau, Power BI)</strong> and 
            <strong> Frontend Web Development (React.js, HTML5, CSS3, Tailwind CSS)</strong>.
          </p>

          <div className="hero-tags">
            <span className="hero-tag"><Database size={14} /> SQL & Python</span>
            <span className="hero-tag"><BarChart2 size={14} /> Tableau & Power BI</span>
            <span className="hero-tag"><Code size={14} /> React.js & Tailwind CSS</span>
            <span className="hero-tag"><Layout size={14} /> Responsive UI Design</span>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              <span>View My Projects</span>
              <ArrowRight size={18} />
            </a>

            <button className="btn-secondary" onClick={onOpenResumeModal}>
              <FileText size={18} />
              <span>Resume PDF</span>
            </button>
            
            <a href="#contact" className="btn-secondary contact-icon-btn" aria-label="Contact">
              <Mail size={18} />
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-card glass-card">
              <span className="stat-number gradient-text-gold">8.31</span>
              <span className="stat-label">B.Tech CGPA / 10</span>
            </div>
            <div className="hero-stat-card glass-card">
              <span className="stat-number">React</span>
              <span className="stat-label">BidSphere UI Project</span>
            </div>
            <div className="hero-stat-card glass-card">
              <span className="stat-number">Intern</span>
              <span className="stat-label">Kinetic Sage Tech</span>
            </div>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="avatar-glow"></div>
          <div className="avatar-frame">
            <img src={profile_img} alt="Anshita Chaudhary" className="profile-img" />
          </div>
          <div className="floating-card card-1 glass-card">
            <BarChart2 className="float-icon cyan" size={24} />
            <div>
              <p className="float-title">Tableau & Power BI</p>
              <p className="float-sub">Dashboards & Analytics</p>
            </div>
          </div>
          <div className="floating-card card-2 glass-card">
            <Code className="float-icon purple" size={24} />
            <div>
              <p className="float-title">React.js & Tailwind</p>
              <p className="float-sub">Frontend UI Development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;