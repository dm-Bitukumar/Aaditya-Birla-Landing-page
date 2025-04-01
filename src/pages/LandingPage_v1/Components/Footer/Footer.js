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
          <span className="footer-email"><a href="mailto: hello@wowinsure.in" class="text-decoration-none">hello@digitmoney.in</a></span>
        </p>

        <div className="footer-links">
          <div className="footer-column">
            <p>
              <a href="#hero">Personal Loan</a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Business Loan
              </a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                PayOff
              </a>
            </p>
            <p>
              <a href="#faqs">FAQs</a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Blogs
              </a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Career
              </a>
            </p>

          </div>
          <div className="footer-column">
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Affiliate Program
              </a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Digital Lending Partners
              </a>
            </p>
            <p>
              <a href="#our-partners">Our Partners</a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                EMI Calculator
              </a>
            </p>
            <p>
              <a
                href="https://web.digitmoney.in/"
                // target="_blank"
                rel="noopener noreferrer"
              >
                Eligibility Calculator
              </a>
            </p>
          </div>
        </div>

        <p className="footer-address">
          <a href="https://www.google.com/maps/place/Regus+-+Mumbai+Navi+Mumbai+Vashi/@19.0656051,72.9938251,17z/data=!3m2!4b1!5s0x3be7c14cc982360b:0xe56cd8202f48699c!4m6!3m5!1s0x3be7c8ee979c7bc9:0xeb3505e4b813f39d!8m2!3d19.0656!4d72.9964!16s%2Fg%2F1hc4583zv?entry=ttu">
            DigitMoney Technologies Pvt Ltd.
            <br />
            1341 Regus Platinum Business Centre Pvt Ltd, Level 13, Platinum Techno Park,
            <br />
            Plot no. 17 & 18, Sector 30A, Vashi,
            <br />
            Navi Mumbai - 400705
          </a>
        </p>

        <div className="footer-social">
          <a href="https://www.facebook.com/DigitMoneyTechnologies"><img src="/assets/img/FB.svg" alt="facebook" /></a>
          <a href="https://www.instagram.com/digitmoney.india"><img src="/assets/img/Insta.svg" alt="instagram" /></a>
          <a href="https://www.linkedin.com/company/digitmoney"><img src="/assets/img/linkedin.svg" alt="linkedin" /></a>
          <a href="https://web.digitmoney.in/"><img src="/assets/img/youtube.svg" alt="youtube" /></a>
          <a href="https://twitter.com/DigitMoneyIndia"><img src="/assets/img/x.svg" alt="x" /></a>
          <a href="https://api.whatsapp.com/send/?phone=9076324177&type=phone_number&app_absent=0"><img src="/assets/img/whatsapp.svg" alt="whatsapp" /></a>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-links">
          <a
            href="https://web.digitmoney.in/"
            // target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
          <a
            href="https://web.digitmoney.in/contact"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
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

        <div className="footer-divider" />

        <p className="footer-copyright">
        Made with Love in India <a href="https://iperformance.in/">iPerformance Media Pvt Ltd</a>
          <br></br>

          A Product of <a href="https://iperformance.in/">iPerformance</a> Ⓒ 2025. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
