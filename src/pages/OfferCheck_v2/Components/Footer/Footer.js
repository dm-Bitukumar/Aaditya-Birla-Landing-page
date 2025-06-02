import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-section1">
      <div className="footer-wrapper">
        <img
          src="/assets/img/New_LOGO.svg"
          alt="DigitMoney Logo"
          className="footer-logo"
        />

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
          <span className="contact1">Contact us at</span>{" "}
          <span className="footer-email">
            <a href="mailto: hello@digitmoney.in" class="text-decoration-none">
              hello@digitmoney.in
            </a>
          </span>
        </p>

        <div className="footer-social1">
          <a href="https://www.facebook.com/DigitMoneyTechnologies">
            <img src="/assets/img/fb_new.png" alt="facebook" />
          </a>
          <a href="https://www.instagram.com/digitmoney.india">
            <img src="/assets/img/insta_new.png" alt="instagram" />
          </a>
          <a href="https://www.linkedin.com/company/digitmoney">
            <img src="/assets/img/linked_in.png" alt="linkedin" />
          </a>
          <a href="https://www.youtube.com/@DigitMoneyIndia">
            <img src="/assets/img/utube_new.png" alt="linkedin" />
          </a>
          
          <a href="https://twitter.com/DigitMoneyIndia">
            <img src="/assets/img/x_new.png" alt="x" />
          </a>
          <a href="https://api.whatsapp.com/send/?phone=9076324177&type=phone_number&app_absent=0">
            <img src="/assets/img/whatsapp_new.png" alt="whatsapp" />
          </a>
        </div>

        <div className="footer-divider1" />

        <div className="footer-bottom-links">
          <a
            href="https://web.digitmoney.in/terms"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </a>
          <a
            href="https://web.digitmoney.in/privacy-policy"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </div>

        <div className="footer-divider1" />

        <p className="footer-copyright">
          A Product of <a href="https://iperformance.in/">iPerformance</a> Ⓒ
          2025. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
