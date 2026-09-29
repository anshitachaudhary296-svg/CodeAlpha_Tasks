import React, { useState } from 'react';
import './Skills.css';
import { Database, Code, BarChart2, Wrench, CheckCircle } from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'data', name: 'Data & BI' },
    { id: 'frontend', name: 'Frontend & Web' },
    { id: 'tools', name: 'Tools & Concepts' }
  ];

  const skillGroups = [
    {
      category: 'data',
      title: 'Data Analysis & Business Intelligence',
      icon: <Database className="cat-icon purple" size={24} />,
      skills: [
        { name: 'Python (Pandas & NumPy)', level: 90 },
        { name: 'SQL & MySQL', level: 88 },
        { name: 'Data Cleaning & Preprocessing', level: 92 },
        { name: 'Exploratory Data Analysis (EDA)', level: 90 },
        { name: 'Report Automation & Dashboard Design', level: 88 }
      ]
    },
    {
      category: 'data',
      title: 'Data Visualization & Reporting',
      icon: <BarChart2 className="cat-icon cyan" size={24} />,
      skills: [
        { name: 'Tableau', level: 85 },
        { name: 'Power BI', level: 88 },
        { name: 'Dashboard Development', level: 90 },
        { name: 'Microsoft Excel (VLOOKUP, Pivot)', level: 92 }
      ]
    },
    {
      category: 'frontend',
      title: 'Frontend Web Development',
      icon: <Code className="cat-icon pink" size={24} />,
      skills: [
        { name: 'React.js & Component Architecture', level: 88 },
        { name: 'Tailwind CSS & Bootstrap', level: 90 },
        { name: 'HTML5 & CSS3', level: 92 },
        { name: 'JavaScript & Interactive UI Design', level: 85 }
      ]
    },
    {
      category: 'tools',
      title: 'Tools & Engineering Concepts',
      icon: <Wrench className="cat-icon gold" size={24} />,
      skills: [
        { name: 'Git & GitHub Version Control', level: 88 },
        { name: 'Visual Studio Code', level: 95 },
        { name: 'Responsive Web Design', level: 92 },
        { name: 'REST API Integration', level: 85 },
        { name: 'Component-Based Architecture', level: 90 }
      ]
    }
  ];

  const filteredGroups = activeCategory === 'all' 
    ? skillGroups 
    : skillGroups.filter(g => g.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Technical <span className="gradient-text">Skills</span></h2>
          <p>Dual proficiency across Data Analytics, Business Intelligence, and Frontend Web Development.</p>
          <div className="title-underline"></div>
        </div>

        {/* Filter Buttons */}
        <div className="skills-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="skill-card glass-card">
              <div className="skill-card-header">
                {group.icon}
                <h3>{group.title}</h3>
              </div>

              <div className="skills-list">
                {group.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="skill-bar-wrapper">
                    <div className="skill-info">
                      <span className="skill-name">
                        <CheckCircle size={14} className="skill-check" />
                        {skill.name}
                      </span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>

                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
