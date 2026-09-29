import React from 'react';
import './ResumeModal.css';
import { X, Printer, ExternalLink, Mail, Phone } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Action Header */}
        <div className="resume-modal-header">
          <h3>Resume Preview - Anshita Chaudhary</h3>
          <div className="resume-modal-actions">
            <button className="btn-secondary btn-sm" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button className="resume-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="resume-paper printable-area">
          <header className="resume-paper-header">
            <h1>ANSHITA CHAUDHARY</h1>
            <p className="resume-paper-role">Data Analyst | Frontend Developer</p>
            <p className="resume-contact-line">
              <span>Lucknow, IN 226001</span>
              <span><Phone size={13} /> +91 7275020999</span>
              <span><Mail size={13} /> anshitachaudhary296@gmail.com</span>
              <span><ExternalLink size={13} /> linkedin.com/in/anshitachaudhary</span>
            </p>
          </header>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">PROFESSIONAL SUMMARY</h2>
            <p>
              Data Analytics Intern supporting data cleaning, preprocessing, and analysis with Python, Excel, and SQL. 
              Turns raw datasets into reports, visualizations, and business insights that support decision-making. 
              Applies exploratory analysis and statistical thinking to spot trends and patterns across project data. 
              Skilled in Frontend Development (React.js, Tailwind CSS, Bootstrap) and component-driven web design.
            </p>
          </section>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">TECHNICAL SKILLS</h2>
            <ul className="paper-skills-grid">
              <li><strong>Programming:</strong> Python, HTML5, CSS3</li>
              <li><strong>Frontend:</strong> React.js, Tailwind CSS, Bootstrap</li>
              <li><strong>Data Analysis:</strong> Pandas, NumPy, Statistical Analysis, Data Cleaning, Exploratory Data Analysis (EDA)</li>
              <li><strong>Databases:</strong> MySQL</li>
              <li><strong>Visualization:</strong> Tableau, Power BI, Dashboard Development</li>
              <li><strong>Tools:</strong> Microsoft Excel, Git, GitHub, Visual Studio Code</li>
              <li><strong>Concepts:</strong> Responsive Web Design, REST API Integration, Component-Based Architecture</li>
              <li><strong>Business Intelligence:</strong> Dashboard design, Report automation</li>
            </ul>
          </section>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">INTERNSHIP EXPERIENCE</h2>
            <div className="paper-item">
              <div className="paper-item-header">
                <strong>DATA ANALYST INTERN</strong>
                <span className="paper-date">09/2025 to 12/2025</span>
              </div>
              <p className="paper-sub">Kinetic Sage Technologies - Noida, India (Remote)</p>
              <ul className="paper-bullet-list">
                <li>Developed visual reports in Tableau to present data findings to stakeholders.</li>
                <li>Analyzed datasets using SQL to identify trends and patterns for business insights.</li>
                <li>Assisted in preparing monthly performance dashboards for management review and decision-making.</li>
                <li>Collaborated with team members to streamline data collection processes and improve efficiency.</li>
              </ul>
            </div>
          </section>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">PROJECTS & CAPSTONE</h2>
            
            <div className="paper-item">
              <div className="paper-item-header">
                <strong>BidSphere – Online Auction Platform | College Group Capstone Project</strong>
                <span className="paper-date">Frontend Developer / UI Developer</span>
              </div>
              <ul className="paper-bullet-list">
                <li>Collaborated with a team to develop an online auction platform.</li>
                <li>Contributed to frontend development using React.js and Tailwind CSS.</li>
                <li>Designed responsive and user-friendly interfaces for Home, Login/Signup, Auction Listing, Dashboard, Contact Us, and Leaderboard pages.</li>
                <li>Developed reusable React components and implemented responsive layouts, smooth navigation, and interactive UI elements.</li>
                <li>Coordinated with team members to integrate frontend features with backend functionality and improve overall user experience. - Capstone Project</li>
              </ul>
            </div>

            <div className="paper-item">
              <strong>Customer Shopping Behavior Analysis — Python, Pandas, NumPy, MySQL, Power BI</strong>
              <ul className="paper-bullet-list">
                <li>Performed data cleaning and exploratory data analysis using Python, Pandas and NumPy.</li>
                <li>Created Power BI dashboards to visualize customer purchasing trends.</li>
                <li>Generated business insights to support customer segmentation and decision-making.</li>
              </ul>
            </div>

            <div className="paper-item">
              <strong>Bike Purchase Behavior Analysis — Python, Pandas, NumPy, Power BI</strong>
              <ul className="paper-bullet-list">
                <li>Analyzed customer demographics and purchasing behavior using Python.</li>
                <li>Performed data cleaning and exploratory data analysis.</li>
                <li>Generated recommendations for customer targeting and marketing strategies.</li>
              </ul>
            </div>
          </section>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">EDUCATION</h2>
            <div className="paper-item">
              <div className="paper-item-header">
                <strong>Dr. Shakuntala Misra National Rehabilitation University - Lucknow</strong>
                <span className="paper-date">07/2026</span>
              </div>
              <p className="paper-sub">Bachelor of Technology | Computer Science and Engineering</p>
              <p className="paper-highlight">GPA: 8.31 / 10</p>
            </div>

            <div className="paper-item">
              <div className="paper-item-header">
                <strong>Kendriya Vidyalaya - Mau, India</strong>
                <span className="paper-date">07/2021</span>
              </div>
              <p className="paper-sub">Senior Secondary (Class XII)</p>
              <p className="paper-highlight">Final Grade: 79.6%</p>
            </div>

            <div className="paper-item">
              <div className="paper-item-header">
                <strong>St Norbert School Dharauli Ghosi Mau - Mau, India</strong>
                <span className="paper-date">05/2019</span>
              </div>
              <p className="paper-sub">Higher Secondary (Class X)</p>
              <p className="paper-highlight">Final Grade: 79.2%</p>
            </div>
          </section>

          <section className="resume-paper-section">
            <h2 className="section-title-paper">CERTIFICATIONS</h2>
            <ul className="paper-bullet-list">
              <li>Deloitte Data Analytics Job Simulation</li>
              <li>Data Analyst Certification (OneRoadmap)</li>
              <li>AWS Online Summit (Participation)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
