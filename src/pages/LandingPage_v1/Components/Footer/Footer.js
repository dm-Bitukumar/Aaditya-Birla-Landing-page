import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-wrapper">
        <img
          src="/assets/img/LOGO SVG.svg"
          alt="DigitMoney Logo"
          className="footer-logo"
        />

        <h2 className="footer-heading">
          Personal Loan <br /> Simplified.
        </h2>

        <div className="footer-cta">Get up to ₹5,00,000 Instantly</div>

        <p className="footer-disclaimer">
          <div className="disclaimer-heading">
            <strong>Disclaimer</strong>
          </div>
          <br />
          This site is free service for customers and provides useful
          information about financial products and services, tools, news and
          summary about popular financial products and services. We are not an
          Financial services company, bank, NBFC, Insurers, brokers,
          aggregators, direct selling agent, agent, registered advisors and do
          not solicit, advise or sell any financial products.In case use decides
          to connect directly with any advertiser or brands listed through this
          website for their individual requirements and/or quotes, we request
          the users to check that the providers have necessary license required
          by their industry regulators to offer services in India. This site
          does not warrant or guarantee any price, quality, service or offer
          listed. It is the responsibility of the user to verify details of the
          service provider before they decide to enter into any transaction with
          them.
        </p>

        <p className="footer-contact">
          Contact us at{" "}
          <span className="footer-email">hello@digitmoney.in</span>
        </p>

        <div className="footer-links">
          <div className="footer-column">
            <p>Personal Loan</p>
            <p>Business Loan</p>
            <p>PayOff</p>
            <p>FAQs</p>
            <p>Blogs</p>
            <p>Career</p>
            <p>Eligibility Calculator</p>
          </div>
          <div className="footer-column">
            <p>Affiliate Program</p>
            <p>Digital Lending Partners</p>
            <p>Our Partners</p>
            <p>EMI Calculator</p>
          </div>
        </div>

        <p className="footer-address">
          DigitMoney Technologies Pvt Ltd.
          <br />
          1341 Regus Platinum Business Centre Pvt Ltd, Level 13, Platinum Techno
          Park,
          <br />
          Plot no. 17 & 18, Sector 30A, Vashi,
          <br />
          Navi Mumbai - 400705
        </p>

        <div className="footer-social">
          <img src="/assets/img/FB.svg" alt="facebook" />
          <img src="/assets/img/insta.svg" alt="instagram" />
          <img src="/assets/img/linkedin.svg" alt="linkedin" />
          <img src="/assets/img/youtube.svg" alt="youtube" />
          <img src="/assets/img/x.svg" alt="x" />
          <img src="/assets/img/whatsapp.svg" alt="whatsapp" />
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-links">
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        <div className="footer-divider" />

        <p className="footer-copyright">
          A Product of iPerformance © 2024. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
