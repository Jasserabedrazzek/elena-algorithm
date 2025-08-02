// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsExpanded(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/home', label: 'Home', icon: 'bi-house' },
    { path: '/algorithms', label: 'Algorithms', icon: 'bi-diagram-3' },
    { path: '/exercises', label: 'Exercises', icon: 'bi-code-square' },
    { path: '/online.python.editor', label: 'Python Editor', icon: 'bi bi-terminal' }

  ];

  return (
    <>
    <nav 
        className={`navbar navbar-expand-lg fixed-top py-2 ${scrolled ? 'glass-navbar shadow' : ''}`}
        style={{ 
            transition: 'background-color 0.3s ease, padding 0.3s ease',
            backgroundColor: "rgba(16, 17, 26, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 1020
        }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="text-primary fw-bold fs-3">ALGO</span>
          <span className="text-danger fw-bold fs-3">RITHME</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon bg-light rounded"></span>
        </button>

        <div 
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
          id="navbarContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item mx-1" key={item.path}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center py-2 px-3 rounded ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-light hover-bg-light hover-text-dark'
                    }`
                  }
                  onClick={() => setIsExpanded(false)}
                >
                  <i className={`bi ${item.icon} me-2`}></i>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    <div style={{height:"70px"}}></div>
    </>
    
  );
};

export default Navbar;