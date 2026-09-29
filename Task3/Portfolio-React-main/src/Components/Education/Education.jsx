import React from 'react';
import './Education.css';
import { GraduationCap, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

const Education = () => {
  const educationList = [
    {
      degree: 'Bachelor of Technology (Computer Science & Engineering)',
      institution: 'Dr. Shakuntala Misra National Rehabilitation University, Lucknow',
      period: '2022 – 2026',
      score: 'CGPA: 8.31 / 10',
      badge: 'Current / B.Tech',
      details: 'Core focus on Computer Science principles, Data Structures, Database Systems (SQL), Python Programming, and Software Engineering methodologies.'
    },
    {
      degree: 'Senior Secondary (Class XII)',
      institution: 'Kendriya Vidyalaya Maunathbhanjan Dumroan',
      period: '2021',
      score: 'Percentage: 79.6%',
      badge: 'Class XII',
      details: 'Focused on Science stream with Mathematics and Computer Science fundamentals.'
    },
    {
      degree: 'Higher Secondary (Class X)',
      institution: 'St Norbert School Dharauli Ghosi Mau',
      period: '2019',
      score: 'Percentage: 79.2%',
      badge: 'Class X',
      details: 'Completed secondary education with consistent academic performance.'
    }
  ];

  const certifications = [
    {
      title: 'Deloitte Data Analytics Job Simulation',
      issuer: 'Deloitte',
      type: 'Job Simulation',
      description: 'Completed practical tasks in data analytics, business insights formulation, and executive dashboard design.'
    },
    {
      title: 'Data Analyst Certification',
      issuer: 'OneRoadmap',
      type: 'Professional Certification',
      description: 'Comprehensive certification covering SQL, Python data manipulation (Pandas/NumPy), and business analytics.'
    },
    {
      title: 'AWS Online Summit',
      issuer: 'Amazon Web Services (AWS)',
      type: 'Participation Certificate',
      description: 'Participated in AWS Summit covering cloud computing, data lakes, and modern analytics infrastructure.'
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Education & <span className="gradient-text">Certifications</span></h2>
          <p>Academic journey, technical qualifications, and industry credentials.</p>
          <div className="title-underline"></div>
        </div>

        <div className="education-grid">
          {/* Education Column */}
          <div className="edu-col">
            <div className="col-header">
              <GraduationCap size={24} className="col-icon purple" />
              <h3>Academic Education</h3>
            </div>

            <div className="edu-timeline">
              {educationList.map((edu, idx) => (
                <div key={idx} className="edu-card glass-card">
                  <div className="edu-card-top">
                    <span className="edu-badge">{edu.badge}</span>
                    <span className="edu-period"><Calendar size={14} /> {edu.period}</span>
                  </div>

                  <h4 className="edu-degree">{edu.degree}</h4>
                  <h5 className="edu-institution">{edu.institution}</h5>

                  <div className="edu-score-pill">
                    <CheckCircle2 size={16} />
                    <span>{edu.score}</span>
                  </div>

                  <p className="edu-details">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="cert-col">
            <div className="col-header">
              <Award size={24} className="col-icon gold" />
              <h3>Certifications & Training</h3>
            </div>

            <div className="cert-list">
              {certifications.map((cert, idx) => (
                <div key={idx} className="cert-card glass-card">
                  <div className="cert-header">
                    <ShieldCheck size={24} className="cert-badge-icon" />
                    <div>
                      <span className="cert-type">{cert.type}</span>
                      <h4 className="cert-title">{cert.title}</h4>
                      <p className="cert-issuer">Issued by {cert.issuer}</p>
                    </div>
                  </div>
                  <p className="cert-desc">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
