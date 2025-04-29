import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img
        src="/assets/img/New_LOGO.svg"
        alt="Digit Money Logo"
        className="logo-img"
      />
      <button className="menu-btn" aria-label="Menu">
        <img
          src="/assets/img/Hamburger menu.svg"
          alt="Menu"
          className="hamburger-icon"
        />
      </button>
    </header>
  );
};

export default Header;
