import React from 'react';
import './Experience.css';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: 'Data Analyst Intern',
      company: 'Kinetic Sage Technologies',
      location: 'Noida, India (Remote)',
      period: '09/2025 – 12/2025',
      type: 'Internship',
      description: 'Supported data cleaning, preprocessing, exploratory data analysis, and developing executive visualization dashboards for stakeholder review.',
      bullets: [
        'Developed visual reports in Tableau to present data findings to stakeholders clearly.',
        'Analyzed datasets using SQL to identify key trends and patterns for strategic business insights.',
        'Assisted in preparing monthly performance dashboards for management review and decision-making.',
        'Collaborated with team members to streamline data collection processes and improve overall workflow efficiency.'
      ],
      skills: ['Tableau', 'SQL', 'Python', 'Excel', 'Dashboard Design', 'Data Collection']
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Work <span className="gradient-text">Experience</span></h2>
          <p>Practical industry internship experience in data analytics and stakeholder reporting.</p>
          <div className="title-underline"></div>
        </div>

        <div className="experience-timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-card glass-card">
              <div className="timeline-badge-icon">
                <Briefcase size={22} />
              </div>

              <div className="timeline-header">
                <div>
                  <div className="role-type-tag">{exp.type}</div>
                  <h3 className="role-title">{exp.role}</h3>
                  <h4 className="company-name">{exp.company}</h4>
                </div>

                <div className="meta-info">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="exp-description">{exp.description}</p>

              <div className="exp-bullets">
                {exp.bullets.map((bullet, bulletIdx) => (
                  <div key={bulletIdx} className="bullet-point">
                    <CheckCircle2 size={16} className="bullet-icon" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="exp-skills">
                {exp.skills.map((skill, skillIdx) => (
                  <span key={skillIdx} className="tech-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
