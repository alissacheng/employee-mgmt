import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { useState } from 'react';
const NavigationBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return(
    <nav className="navbar navbar-expand-lg px-4">
      {/* <a className="navbar-brand" href="#">Employee Platform Manager</a> */}
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        onClick={toggleNav}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a>Employees</a>
          </li>
          <li className="nav-item">
            <a>Departments</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;