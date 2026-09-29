import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Experience from './Components/Experience/Experience';
import MyWork from './Components/MyWork/MyWork';
import Skills from './Components/Skills/Skills';
import Education from './Components/Education/Education';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import ResumeModal from './Components/ResumeModal/ResumeModal';

const App = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openResumeModal = () => setIsResumeOpen(true);
  const closeResumeModal = () => setIsResumeOpen(false);

  return (
    <div className="portfolio-app">
      <Navbar onOpenResumeModal={openResumeModal} />
      <Hero onOpenResumeModal={openResumeModal} />
      <About />
      <Experience />
      <MyWork />
      <Skills />
      <Education />
      <Contact />
      <Footer />

      <ResumeModal isOpen={isResumeOpen} onClose={closeResumeModal} />
    </div>
  );
};

export default App;
