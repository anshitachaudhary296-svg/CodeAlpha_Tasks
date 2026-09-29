import React, { useState } from 'react';
import './Contact.css';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';

const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'submitting', 'success'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <h2>Get in <span className="gradient-text">Touch</span></h2>
          <p>Have an entry-level data analytics role, project collaboration, or opportunity? Let's connect!</p>
          <div className="title-underline"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-info-col">
            <h3 className="contact-heading">Let's talk about Data & Tech</h3>
            <p className="contact-intro">
              I am actively seeking entry-level Data Analyst, Business Analyst, or Software Engineering roles. 
              Feel free to reach out via email, phone, or LinkedIn.
            </p>

            <div className="contact-cards">
              <a href="mailto:anshitachaudhary296@gmail.com" className="contact-item-card glass-card">
                <div className="contact-icon-box purple">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="contact-label">Email Me</span>
                  <p className="contact-value">anshitachaudhary296@gmail.com</p>
                </div>
              </a>

              <a href="tel:+917275020999" className="contact-item-card glass-card">
                <div className="contact-icon-box cyan">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="contact-label">Call / WhatsApp</span>
                  <p className="contact-value">+91 7275020999</p>
                </div>
              </a>

              <a href="https://linkedin.com/in/anshitachaudhary" target="_blank" rel="noopener noreferrer" className="contact-item-card glass-card">
                <div className="contact-icon-box gold">
                  <LinkedinIcon size={22} />
                </div>
                <div>
                  <span className="contact-label">LinkedIn Profile</span>
                  <p className="contact-value">linkedin.com/in/anshitachaudhary</p>
                </div>
              </a>

              <div className="contact-item-card glass-card">
                <div className="contact-icon-box pink">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="contact-label">Location</span>
                  <p className="contact-value">Lucknow / Noida, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-col glass-card">
            <h3 className="form-title">Send a Message</h3>
            
            {status === 'success' && (
              <div className="success-toast">
                <CheckCircle2 size={20} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Role Opportunity / Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Hi Anshita, I would like to discuss..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
