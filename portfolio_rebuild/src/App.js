// App.js
import React from 'react';
import Navbar from './Component/Navbar/Navbar';
import Home from './Component/Home/Home'
// import About from './Component/About/About';
import Services from './Component/Services/Services';
import Skills from './Component/Skills/Skills';
import Work from './Component/Work/Work';
import './App.scss'; 
import Footer from './Component/Footer/Footer';
import Education from './Component/Education/Education';

const App = () => {
  return (
    <div>
      <Navbar />
      <section id="home" className="section home p-relative pb-lg-0">
        <Home />
      </section>
      <section id="about" className="section about">
        <Skills />
      </section>
      <section id="services" className="section services">
        <Services />
      </section>
      <section id="work" className="section work">
        <Work />
      </section>
      <section id="footer" className="section footer">
        <Footer />
      </section>
    </div>
  );
};

export default App;
