import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <section className="footer">
      <div className="container m-auto">
        <div className="web-footer">
          <div className="row">
            <div className="col-6 left-side">
              <div className="logo">
                <a href="/">
                  <img src="/assets/img/logo.png" alt="" />
                </a>
              </div>
              <p>Personal Loan Simplified.</p>
              <h3>COMPANY</h3>
              <p>
                <Link to="/terms">Terms</Link>|
                <Link to="/privacy-policy">Privacy Policy</Link>|
                <Link to="/contact">Contact Us</Link>|
                <a href="https://sachet.rbi.org.in/">RBI Sachet</a>
              </p>
              <div className="address">
                <a
                  href="https://www.google.com/maps/place/Regus+-+Mumbai+Navi+Mumbai+Vashi/@19.0656051,72.9938251,17z/data=!3m2!4b1!5s0x3be7c14cc982360b:0xe56cd8202f48699c!4m6!3m5!1s0x3be7c8ee979c7bc9:0xeb3505e4b813f39d!8m2!3d19.0656!4d72.9964!16s%2Fg%2F1hc4583zv?entry=ttu"
                  target="_blank"
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
              <h3>GRIEVANCE REDRESSAL OFFICER DETAILS</h3>
              <div className="address">
                <a href="mailto:grievance@digitmoney.in">
                  Ammy Pinheiro
                  <br />
                  grievance@digitmoney.in
                </a>
              </div>
              <div className="social_icons">
                <a
                  href="https://www.facebook.com/DigitMoneyTechnologies"
                  className="social_icon facebook"
                  target="_blank"
                  aria-label="Facebook link of DigitMoney"
                >
                  <img src="/assets/img/facebook.png" alt="" />
                </a>
                <a
                  href="https://www.instagram.com/digitmoney.india"
                  className="social_icon instagram"
                  target="_blank"
                  aria-label="Instagram link of DigitMoney"
                >
                  <img src="/assets/img/instagram.png" alt="" />
                </a>
                <a
                  href="https://twitter.com/DigitMoneyIndia"
                  className="social_icon twitter"
                  target="_blank"
                  aria-label="Twitter link of DigitMoney"
                >
                  <img src="/assets/img/twitter.png" alt="" />
                </a>
                <a
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
            <div className="col-6 right-side">
              <div className="card">
                <div className="row mx-0">
                  <div className="col-4 text-center">
                    <a href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                      <img
                        className={"m-auto"}
                        src="/assets/img/chat.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="mailto: hello@digitmoney.in">
                      <img
                        className={"m-auto"}
                        src="/assets/img/mail.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4 text-center">
                    <a href="tel:9076324177">
                      <img
                        className={"m-auto"}
                        src="/assets/img/call.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-4 text-center">
                    <p>
                      {" "}
                      <a href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                        Chat
                      </a>
                    </p>
                  </div>
                  <div className="col-4 text-center">
                    <p>
                      {" "}
                      <a href="mailto: hello@digitmoney.in">Email</a>
                    </p>
                  </div>
                  <div className="col-4 text-center">
                    <p>
                      {" "}
                      <a href="tel:9076324177">Call</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row features">
                <ul className="col-6">
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="#faqs">FAQs</a>
                  </li>
                  <li>
                    <a href="/">Blogs</a>
                  </li>
                  <li>
                    <a href="/">Career</a>
                  </li>
                  <li>
                    <a href="/">Eligibility Calculator</a>
                  </li>
                </ul>
                <ul className="col-6">
                  <li>
                    <a href="/">Affiliate Program</a>
                  </li>
                  <li>
                    <a href="lenders">Digital Lending Partners</a>
                  </li>
                  <li>
                    <a href="/">Our Partners</a>
                  </li>
                  <li>
                    <a href="#emi">EMI Calculator</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-footer">
          <div className="row">
            <div className="col-12 text-center">
              <div className="logo">
                <a href="index">
                  <img src="/assets/img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-12 text-center">
              <p>Personal Loan Simplified.</p>
              <h3>COMPANY</h3>
              <p>
                <Link to="/terms">Terms</Link>|
                <Link to="/privacy-policy">Privacy Policy</Link>|
                <Link to="/contact">Contact Us</Link>|
                <a href="https://sachet.rbi.org.in/">RBI Sachet</a>
              </p>
              <h3>GRIEVANCE REDRESSAL OFFICER DETAILS</h3>
              <div className="address">
                <a href="mailto: grievance@digitmoney.in">
                  Ammy Pinheiro
                  <br />
                  grievance@digitmoney.in
                </a>
              </div>
            </div>
            <div className="col-12 text-center">
              <div className="social_icons">
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
            <div className="col-12 text-center">
              <div className="card">
                <div className="row mx-0">
                  <div className="col-4 px-0 text-center">
                    <a href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                      <img src="/assets/img/chat.png" alt="" />
                    </a>
                  </div>
                  <div className="col-4 px-0 text-center">
                    <a href="mailto: hello@digitmoney.in">
                      <img src="/assets/img/mail.png" alt="" />
                    </a>
                  </div>
                  <div className="col-4 px-0 text-center">
                    <a href="tel:9076324177">
                      <img src="/assets/img/call.png" alt="" />
                    </a>
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-4 px-0 text-center">
                    <p>
                      {" "}
                      <a href="https://api.whatsapp.com/send/?phone=9076324177&amp;type=phone_number&amp;app_absent=0">
                        Chat
                      </a>
                    </p>
                  </div>
                  <div className="col-4 px-0 text-center">
                    <p>
                      {" "}
                      <a href="mailto: hello@digitmoney.in">Email</a>
                    </p>
                  </div>
                  <div className="col-4 px-0 text-center">
                    <p>
                      {" "}
                      <a href="tel:9076324177">Call</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 mt-3">
              <hr />
            </div>
            <div className="col-12">
              <div className="row features">
                <ul className="col-6 px-0">
                  <li>
                    <a href="/">About Us</a>
                  </li>
                  <li>
                    <a href="#faqs">FAQs</a>
                  </li>
                  <li>
                    <a href="/">Blogs</a>
                  </li>
                  <li>
                    <a href="/">Career</a>
                  </li>
                  <li>
                    <a href="/">Eligibility Calculator</a>
                  </li>
                </ul>
                <ul className="col-6 px-0">
                  <li>
                    <a href="/">Affiliate Program</a>
                  </li>
                  <li>
                    <a href="/">Digital Lending Partners</a>
                  </li>
                  <li>
                    <a href="/">Our Partners</a>
                  </li>
                  <li>
                    <a href="#emi">EMI Calculator</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12 text-center">
              <div className="address">
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
        <div className="row copyright">
          <div className="col-12 text-center">
            © <a href="/">DIGITMONEY</a> 2024{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFooter;
