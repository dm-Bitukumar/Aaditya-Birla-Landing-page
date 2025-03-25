import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="/assets/img/Dm LOGO.png" alt="Digit Money Logo" className="logo-img" />
      <button className="menu-btn" aria-label="Menu">
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </header>
  );
};

export default Header;
