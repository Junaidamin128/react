import React from 'react';
import './css/Footer.css';  // Import the corresponding CSS for styling

const Footer = () => {
  return (

    <footer className="footer bg-light">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-auto footer-links">
            <a href="/">About</a>
            <a href="/">Help</a>
            <a href="/">Press</a>
            <a href="/">API</a>
            <a href="/">Jobs</a>
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
            <a href="/">Locations</a>
            <a href="/">Top Accounts</a>
            <a href="/">Hashtags</a>
            <a href="/">Language</a>
          </div>
          <div className="col-md-auto footer-logo">
            <span>&copy; 2022 Instagram</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
