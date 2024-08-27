import React from 'react';
import './Footer.scss';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2>My Portfolio</h2>
                </div>
                <div className="footer-links">
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#work">Work</a>
                </div>
                <div className="footer-social">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
