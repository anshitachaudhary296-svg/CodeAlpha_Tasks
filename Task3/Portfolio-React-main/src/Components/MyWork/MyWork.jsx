import React, { useState } from 'react';
import './MyWork.css';
import bidsphere_img from '../../assets/bidsphere_preview.png';
import customer_shopping_img from '../../assets/customer_shopping_dashboard.png';
import bike_purchase_img from '../../assets/bike_purchase_dashboard.png';
import { X, CheckCircle, ArrowUpRight, ExternalLink, Globe } from 'lucide-react';

const MyWork = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'BidSphere – Online Auction Platform',
      category: 'College Group Capstone Project',
      role: 'Frontend Developer / UI Developer',
      subtitle: 'Online Auction Platform Built with React.js & Tailwind CSS',
      image: bidsphere_img,
      liveUrl: 'https://projectbidsphere.netlify.app/',
      tags: ['React.js', 'Tailwind CSS', 'UI/UX Design', 'Component Architecture', 'Frontend Development', 'Responsive Design'],
      highlights: [
        'Collaborated with a college project team to develop an online auction web platform.',
        'Contributed to frontend development using React.js and Tailwind CSS.',
        'Designed responsive and user-friendly interfaces for Home, Login/Signup, Auction Listing, Dashboard, Contact Us, and Leaderboard pages.',
        'Developed reusable React components and implemented responsive layouts, smooth navigation, and interactive UI elements.',
        'Coordinated with team members to integrate frontend features with backend functionality and improve overall user experience.'
      ],
      details: {
        problem: 'Auction web applications require dynamic UI layouts, clear product listings, responsive navigation, and user-friendly bidding dashboards.',
        solution: 'Designed and built reusable React UI components with Tailwind CSS for clean styling, responsive form layouts, and interactive dashboard views.',
        outcomes: ['Live Deployed Web Application', '6+ core interactive pages designed & built', 'Reusable React component architecture', 'Seamless UI integration with backend API']
      }
    },
    {
      id: 2,
      title: 'Customer Shopping Behavior Analysis',
      category: 'Data Analytics & Power BI',
      role: 'Data Analyst',
      subtitle: 'Customer Behavior Dashboard: 3.9K Customers & Category Revenue Analysis',
      image: customer_shopping_img,
      tags: ['Python', 'Pandas', 'NumPy', 'MySQL', 'Power BI', 'EDA', 'DAX Measures'],
      highlights: [
        'Analyzed customer shopping behavior dataset tracking 3.9K customers, $59.76 average purchase amount, and 3.75 average review rating.',
        'Built interactive Power BI Customer Behavior Dashboard analyzing Revenue & Sales by Category (Clothing, Accessories, Footwear, Outerwear).',
        'Evaluated sales and revenue performance across Age Groups (Young Adult, Middle-aged, Adult, Senior) and Subscription Status.',
        'Integrated interactive slicers for Gender, Product Category, and Shipping Type (Express, 2-Day, Next Day, Free Shipping).'
      ],
      details: {
        problem: 'Retail stakeholders needed visibility into key customer purchasing KPIs, revenue concentration across categories, and age-group demographics.',
        solution: 'Executed end-to-end data cleaning in Python/Pandas, structured data in MySQL, and built a Power BI dashboard with subscription status donuts, category revenue bar charts, and age group breakdowns.',
        outcomes: ['Tracked 3.9K customers & $59.76 average purchase amount', 'Identified Clothing & Accessories as top revenue drivers', 'Mapped Young Adult & Middle-aged core customer revenue']
      }
    },
    {
      id: 3,
      title: 'Bike Purchase Behavior Analysis',
      category: 'Data Analytics & Excel Pivot Dashboards',
      role: 'Data Analyst',
      subtitle: 'Income, Commute Distance & Age Bracket Purchase Analysis',
      image: bike_purchase_img,
      tags: ['Python', 'Pandas', 'NumPy', 'Excel Dashboards', 'Pivot Tables', 'Demographic Analytics'],
      highlights: [
        'Analyzed 1,000+ customer records to identify key drivers of bike purchases across income, commute distance, and age brackets.',
        'Built dynamic Excel pivot charts analyzing Income vs Gender (Male avg $60.1k vs Female avg $55.7k for buyers).',
        'Identified short commute distance (0-1 miles: 200 purchases) as primary buying trigger and Middle Age (31-54 years: 383 purchases) as top converting demographic.',
        'Generated targeted marketing recommendations for regional customer segmentation and commute-focused promotions.'
      ],
      details: {
        problem: 'Understanding how demographic factors (Income, Age Bracket, Commute Distance) influence individual vehicle purchasing decisions.',
        solution: 'Executed full data cleaning in Python/Excel, created pivot tables and line/bar visualizations for Income by Gender, Commute Distance, and Age Brackets (25-89).',
        outcomes: ['Targeted Middle Age (31-54) core demographic', 'Isolated 0-1 mile commute high-conversion segment', 'Provided income-tiered marketing strategies']
      }
    }
  ];

  return (
    <section id="projects" className="mywork-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Featured <span className="gradient-text">Projects</span></h2>
          <p>Highlights spanning Frontend Web Development (React.js, Tailwind CSS) & Data Analytics (Python, SQL, Power BI, Excel).</p>
          <div className="title-underline"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card glass-card">
              <div className="project-img-wrapper">
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-overlay">
                  <div className="overlay-btns">
                    <button 
                      className="btn-primary btn-sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={16} />
                    </button>

                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary btn-sm live-link-btn"
                      >
                        <Globe size={15} />
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-body">
                <div className="project-meta-line">
                  <span className="project-category">{project.category}</span>
                  <span className="project-role-badge">{project.role}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>

                <div className="project-bullets">
                  {project.highlights.slice(0, 3).map((bullet, idx) => (
                    <div key={idx} className="project-bullet">
                      <CheckCircle size={15} className="bullet-check" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="project-tags">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="tech-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <button 
                    className="project-detail-link"
                    onClick={() => setSelectedProject(project)}
                  >
                    <span>Full Details & Features</span>
                    <ArrowUpRight size={16} />
                  </button>

                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-live-anchor"
                    >
                      <Globe size={14} />
                      <span>Live Site</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <X size={20} />
            </button>

            <span className="project-category">{selectedProject.category}</span>
            <h3 className="modal-title">{selectedProject.title}</h3>
            <p className="modal-subtitle">Role: <strong>{selectedProject.role}</strong> — {selectedProject.subtitle}</p>

            {selectedProject.liveUrl && (
              <div className="modal-live-banner">
                <Globe size={18} />
                <span>Live Project URL: </span>
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  {selectedProject.liveUrl} <ExternalLink size={14} />
                </a>
              </div>
            )}

            <div className="modal-section">
              <h4>Key Project Accomplishments</h4>
              <ul className="modal-bullet-list">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h4>Problem Statement</h4>
              <p>{selectedProject.details.problem}</p>
            </div>

            <div className="modal-section">
              <h4>Solution & Technical Methodology</h4>
              <p>{selectedProject.details.solution}</p>
            </div>

            <div className="modal-section">
              <h4>Key Deliverables & Impact</h4>
              <div className="outcomes-chips">
                {selectedProject.details.outcomes.map((out, idx) => (
                  <span key={idx} className="outcome-chip">
                    <CheckCircle size={14} /> {out}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-tags">
              {selectedProject.tags.map((tag, tagIdx) => (
                <span key={tagIdx} className="tech-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyWork;
