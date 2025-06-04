import React from "react";
import "./Header.css";

const Header = ({ isOfferPage }) => {
  isOfferPage = true;
  const logoSrc = isOfferPage
    ? "/assets/img/newLogo.png"
    : "/assets/img/newLogo.png";

  return (
    <header className="header">
      <img src={logoSrc} alt="Digit Money Logo" className="logo-img" />
      {/* <button className="menu-btn" aria-label="Menu">
        <img src={hamburgerSrc} alt="Menu" className="hamburger-icon" />
      </button> */}
    </header>
  );
};

export default Header;
