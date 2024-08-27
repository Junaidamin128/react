import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsOpen(prevState => !prevState);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="navbar-brand">MyLandingPage</div>
      <div className={`navbar-menu ${isOpen ? 'show' : ''}`}>
        <div className="close-icon" onClick={toggleMenu}>✖</div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="home" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="about" smooth={true} duration={500} onClick={() => setIsOpen(false)}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="services" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Services</Link>
          </li>
          <li className="nav-item">
            <Link to="work" smooth={true} duration={500} onClick={() => setIsOpen(false)}>Work</Link>
          </li>
        </ul>
      </div>
      <div className={`navbar-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>☰</div>
    </nav>
  );
};

export default Navbar;
