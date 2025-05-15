import React from "react";
import "./Header.css";

const Header = ({ isOfferPage }) => {
  const logoSrc = isOfferPage
    ? "/assets/img/New_LOGO.svg"
    : "/assets/img/newLogo.png";

  const hamburgerSrc = isOfferPage
    ? "/assets/img/Hamburger menu.svg"
    : "/assets/img/lp1hamberger.png";

  return (
    <header className="header">
      <img src={logoSrc} alt="Digit Money Logo" className="logo-img" />
      <button className="menu-btn" aria-label="Menu">
        <img
          src={hamburgerSrc}
          alt="Menu"
          className="hamburger-icon"
        />
      </button>
    </header>
  );
};

export default Header;
