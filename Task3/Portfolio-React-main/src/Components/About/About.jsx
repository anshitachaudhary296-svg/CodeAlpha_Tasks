import React from 'react';
import './About.css';
import profile_img from '../../assets/anshitapic.jpg';
import { Award, GraduationCap, Briefcase, Code, CheckCircle, Sparkles, Layout } from 'lucide-react';

const About = () => {
  const highlights = [
    "Consistent Academic Excellence (CGPA 8.31/10) in B.Tech CSE (2022 – 2026)",
    "Frontend & Web Developer skilled in React.js, Tailwind CSS, Bootstrap, HTML5, & CSS3",
    "Data Analyst experienced in Python (Pandas/NumPy), SQL, MySQL, Tableau, & Power BI",
    "Frontend UI Developer in BidSphere College Group Capstone Project",
    "Data Analytics Internship experience at Kinetic Sage Technologies (Remote)"
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="section-header">
          <h2>About <span className="gradient-text">Me</span></h2>
          <p>Dual expertise in Data Analytics and Frontend Web Development.</p>
          <div className="title-underline"></div>
        </div>

        <div className="about-grid">
          <div className="about-left-col">
            <div className="about-image-card glass-card">
              <img src={profile_img} alt="Anshita Chaudhary" className="about-img" />
              <div className="about-img-badge glass-card">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Data Analyst | Frontend Developer</span>
              </div>
            </div>
          </div>

          <div className="about-right-col">
            <h3 className="about-subtitle">
              Turning Raw Data into Insights & Building Responsive Frontend UIs
            </h3>

            <p className="about-para">
              I am a <strong>Data Analyst & Frontend Developer</strong> supporting data cleaning, preprocessing, 
              and analysis with <strong>Python, Excel, and SQL</strong>. I turn raw datasets into reports, 
              visualizations, and business insights that support decision-making, while applying exploratory analysis 
              and statistical thinking to spot trends across project data.
            </p>

            <p className="about-para">
              On the frontend engineering side, I build responsive, component-driven web user interfaces using 
              <strong> React.js, Tailwind CSS, Bootstrap, and HTML/CSS</strong>, including UI design and frontend development 
              for our college capstone project — BidSphere Online Auction Platform.
            </p>

            <div className="about-highlights">
              {highlights.map((item, idx) => (
                <div key={idx} className="highlight-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Impact Stats */}
        <div className="about-cards-grid">
          <div className="about-metric-card glass-card">
            <div className="metric-icon-box purple">
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="metric-value">8.31 / 10</h4>
              <p className="metric-title">B.Tech CGPA</p>
              <p className="metric-sub">Dr. Shakuntala Misra NRU, Lucknow</p>
            </div>
          </div>

          <div className="about-metric-card glass-card">
            <div className="metric-icon-box cyan">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="metric-value">Internship</h4>
              <p className="metric-title">Data Analyst Intern</p>
              <p className="metric-sub">Kinetic Sage Technologies</p>
            </div>
          </div>

          <div className="about-metric-card glass-card">
            <div className="metric-icon-box gold">
              <Layout size={24} />
            </div>
            <div>
              <h4 className="metric-value">BidSphere</h4>
              <p className="metric-title">College Group Capstone</p>
              <p className="metric-sub">Frontend Developer / UI Developer</p>
            </div>
          </div>

          <div className="about-metric-card glass-card">
            <div className="metric-icon-box pink">
              <Award size={24} />
            </div>
            <div>
              <h4 className="metric-value">Certifications</h4>
              <p className="metric-title">3 Industry Credentials</p>
              <p className="metric-sub">Deloitte, OneRoadmap, AWS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
