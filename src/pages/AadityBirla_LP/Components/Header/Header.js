import React from "react";
import "./Header.css";

const Header = ({ isOfferPage }) => {
  const logoSrc = isOfferPage
    ? "/assets/img/newLogo.png"
    : "/assets/img/New_LOGO.svg";

  const Abfl_Icon = isOfferPage
    ? "/assets/icons/abfl-logo.svg"
    : "/assets/icons/abfl-logo.png";

  return (
    <header className="header">
      <img 
      src={logoSrc}
      alt="Digit Money Logo" 
      className="logo-img"
       />

      <img
       src={Abfl_Icon}
       alt="Menu"
       className="hamburger-icon"
        />
     
    </header>
  );
};

export default Header;
