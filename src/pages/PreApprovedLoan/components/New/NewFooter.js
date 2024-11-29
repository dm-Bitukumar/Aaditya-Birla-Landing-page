import React from "react";
import "./css/NewFooter.css";
import { Link } from "react-router-dom";
import { setUserClickData } from "../../../../utility/setUserClickData";

const NewFooter = () => {
  return (
    <section className="footer">
      <div className="container m-auto">
        <div className="mobile-footer2">
          <div className="row">
            <div className="flex justify-center text-center col-12">
              <div className="logo">
                <a href="index">
                  <img src="/assets/img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="text-center col-12">
              <p>Personal Loan Simplified.</p>
              <h3>COMPANY</h3>
              <p>
                <Link
                  to="/terms"
                  onClick={() => {
                    setUserClickData({
                      event_name: "link-term-page",
                    });
                  }}
                >
                  Terms
                </Link>
                |
                <Link
                  to="/privacy-policy"
                  onClick={() => {
                    setUserClickData({
                      event_name: "link-privacy-page",
                    });
                  }}
                >
                  Privacy Policy
                </Link>
                |
                <Link
                  to="/contact"
                  onClick={() => {
                    setUserClickData({
                      event_name: "link-contact-page",
                    });
                  }}
                >
                  Contact Us
                </Link>
                |
                <a
                  href="https://sachet.rbi.org.in/"
                  onClick={() => {
                    setUserClickData({
                      event_name: "rbi-page-link",
                    });
                  }}
                >
                  RBI Sachet
                </a>
              </p>
              <h3>GRIEVANCE REDRESSAL OFFICER DETAILS</h3>
              <div
                className="address"
                onClick={() => {
                  setUserClickData({
                    event_name: "grievance-digit-money",
                  });
                }}
              >
                <a href="mailto: grievance@digitmoney.in">
                  Ammy Pinheiro
                  <br />
                  grievance@digitmoney.in
                  <br />
                <a href="tel:08065323927">08065323927</a>
                </a>
              </div>
            </div>
            <div className="flex justify-center text-center col-12">
              <div
                className="social_icons2"
                onClick={() => {
                  setUserClickData({
                    event_name: "social-media-link",
                  });
                }}
              >
                <a
                  rel={"noreferrer"}
                  href="https://www.facebook.com/DigitMoneyTechnologies"
                  className="social_icon facebook"
                  target="_blank"
                  aria-label="Facebook link of DigitMoney"
                >
                  <img src="/assets/img/facebook.png" alt="" />
                </a>
                <a
                  rel={"noreferrer"}
                  href="https://www.instagram.com/digitmoney.india"
                  className="social_icon instagram"
                  target="_blank"
                  aria-label="Instagram link of DigitMoney"
                >
                  <img src="/assets/img/instagram.png" alt="" />
                </a>
                <a
                  rel={"noreferrer"}
                  href="https://twitter.com/DigitMoneyIndia"
                  className="social_icon twitter"
                  target="_blank"
                  aria-label="Twitter link of DigitMoney"
                >
                  <img src="/assets/img/twitter.png" alt="" />
                </a>
                <a
                  rel={"noreferrer"}
                  href="https://www.linkedin.com/company/digitmoney"
                  className="social_icon linkedin"
                  target="_blank"
                  aria-label="LinkedIn link of DigitMoney"
                >
                  <img src="/assets/img/linkedin.png" alt="" />
                </a>
                <a
                  href="/"
                  className="social_icon youtube"
                  target="_blank"
                  aria-label="Youtube link of DigitMoney"
                >
                  <img src="/assets/img/youtube.png" alt="" />
                </a>
                <a
                  href="/"
                  className="social_icon threads"
                  target="_blank"
                  aria-label="Threads link of DigitMoney"
                >
                  <img src="/assets/img/threads.png" alt="" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center col-12">
              <div className="card2">
                <div className="mx-0 row">
                  <div
                    className="flex justify-center text-center col-4"
                    onClick={() => {
                      setUserClickData({
                        event_name: "whatsapp-link",
                      });
                    }}
                  >
                    <Link href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                      <img
                        src="/assets/img/chat.png"
                        style={{ width: "28px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div
                    className="flex justify-center text-center col-4"
                    onClick={() => {
                      setUserClickData({
                        event_name: "dm-mail-link",
                      });
                    }}
                  >
                    <Link href="mailto: hello@digitmoney.in">
                      <img
                        src="/assets/img/mail.png"
                        style={{ width: "28px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div
                    className="flex justify-center text-center col-4"
                    onClick={() => {
                      setUserClickData({
                        event_name: "dm-phone-link",
                      });
                    }}
                  >
                    <Link href="tel:9076324177">
                      <img
                        src="/assets/img/call.png"
                        style={{ width: "28px" }}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="mx-0 row"
                  onClick={() => {
                    setUserClickData({
                      event_name: "whatsapp-chat-link",
                    });
                  }}
                >
                  <div className="flex justify-center px-0 text-center col-4">
                    <p>
                      {" "}
                      <a href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                        Chat
                      </a>
                    </p>
                  </div>
                  <div className="flex justify-center px-0 text-center col-4">
                    <p>
                      {" "}
                      <a href="mailto: hello@digitmoney.in">Email</a>
                    </p>
                  </div>
                  <div className="flex justify-center px-0 text-center col-4">
                    <p>
                      {" "}
                      <a href="tel:9076324177">Call</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 col-12">
              <hr />
            </div>
            <div className="items-start justify-start text-start col-12">
              <div className="row features2">
                <ul className="px-0 col-6">
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "about-us-link",
                      });
                    }}
                  >
                    <a href="/">About Us</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "faqs-link",
                      });
                    }}
                  >
                    <a href="#faqs">FAQs</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "blogs-link",
                      });
                    }}
                  >
                    <a href="/">Blogs</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "blogs-link",
                      });
                    }}
                  >
                    <a href="/">Career</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "eligibility-calc-link",
                      });
                    }}
                  >
                    <a href="/">Eligibility Calculator</a>
                  </li>
                </ul>
                <ul className="px-0 col-6">
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "affiliate-link",
                      });
                    }}
                  >
                    <a href="/">Affiliate Program</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "leading-partner-link",
                      });
                    }}
                  >
                    <a href="/">Digital Lending Partners</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "our-partner-link",
                      });
                    }}
                  >
                    <a href="/">Our Partners</a>
                  </li>
                  <li
                    onClick={() => {
                      setUserClickData({
                        event_name: "emi-calc-link",
                      });
                    }}
                  >
                    <a href="#emi">EMI Calculator</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="text-center col-12">
              <div
                className="address"
                onClick={() => {
                  setUserClickData({
                    event_name: "digit-money-address-link",
                  });
                }}
              >
                <a
                  href="https://www.google.com/maps/place/Regus+-+Mumbai+Navi+Mumbai+Vashi/@19.0656051,72.9938251,17z/data=!3m2!4b1!5s0x3be7c14cc982360b:0xe56cd8202f48699c!4m6!3m5!1s0x3be7c8ee979c7bc9:0xeb3505e4b813f39d!8m2!3d19.0656!4d72.9964!16s%2Fg%2F1hc4583zv?entry=ttu"
                  target="_blank"
                  rel={"noreferrer"}
                >
                  DigitMoney Technologies Pvt Ltd
                  <br />
                  1341 Regus Platinum Business Centre Pvt Ltd,
                  <br />
                  Level 13, Platinum Techno Park, <br />
                  Plot no. 17 &amp; 18, Sector 30A, Vashi, <br />
                  Navi Mumbai - 400705
                  <br />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row copyright2">
          <div className="text-center col-12">
            © <a href="/">DIGITMONEY</a> 2024{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFooter;
