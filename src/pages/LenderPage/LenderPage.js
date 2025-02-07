import { defaultFormat } from "moment";
import { Link } from "react-router-dom";
import banking from "../../constants/bankImg.json";
import MainFooter from "../Homepage/components/MainFooter";
import "./lenderPage.css";

const LenderPage = () => {
  return (
    <>
      <div className="main_lender_img">
        <div className="container m-auto">
          <Link to="/" className="banner-logo">
            <img src="/assets/img/logo.png" alt="" />
          </Link>
        </div>
      </div>
      <section className="lender_faq">
        <div className="container m-auto text-center banner-img">
          <h1 className="lender_heading">Banking Partners</h1>
        </div>
        {/* <div className="wb-moto"> */}
        <div className="container m-auto">
          <div className="lender_row row">
            {banking.map((item, index) => (
              <div key={index} className="text-center col-md-2 col-4">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.label}
                      alt="Bank Logo"
                      className="mx-auto my-1"
                    />
                  </a>
                ) : (
                  <img
                    src={item.label}
                    alt=""
                    className="mx-auto my-1"
                    // style={{
                    //   maxWidth: "50%",
                    //   maxHeight: "75%",
                    //   objectFit: "contain",
                    // }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <MainFooter />
    </>
  );
};

export default LenderPage;
