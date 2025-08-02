import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="social-section">
          <div className="follow-me">Follow Me</div>
          <div className="social-icons">
            <a href="https://www.facebook.com/jasser.razzek.3/" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="icon-wrapper facebook">
                <i className="fa-brands fa-facebook-f social-icon"></i>
              </div>
            </a>
            <a href="https://www.instagram.com/jasserabedrazzek/" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="icon-wrapper instagram">
                <i className="fa-brands fa-instagram social-icon"></i>
              </div>
            </a>
            <a href="https://www.tiktok.com/@jasser_abr" target="_blank" rel="noopener noreferrer" className="social-link">
              <div className="icon-wrapper tiktok">
                <i className="fa-brands fa-tiktok social-icon"></i>
              </div>
            </a>
          </div>
        </div>
        
        <div className="divider-line"></div>
        
        <div className="copyright-section">
          <span className="copyright">
            <i className="fa-regular fa-copyright copyright-icon"></i>
            <span className="brand-name">ELena ALGO</span>
            <span className="brand-name-secondary">RITHME</span>
          </span>
          <span className="year-info">BAC TN 2024 - {currentYear}</span>
          <div className="made-with">
            Made with <i className="fa-regular fa-heart heart-icon"></i> in Tunisia
          </div>
        </div>
      </div>
      
      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default Footer;