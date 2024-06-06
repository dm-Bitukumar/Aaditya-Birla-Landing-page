import React, { useState } from "react";
import { Link } from "react-router-dom";

const DocumentsEligibility = () => {
  const [activeType, setActiveType] = useState("salaried");

  const handleChangeType = (type) => {
    setActiveType(type);
  };

  return (
    <section className="types" style={{ margin: "10rem 0" }}>
      <div className="container m-auto">
        <div className="heading">Documents Required & Eligibility Criteria</div>
        <div className="both-parts">
          <ul className="nav nav-tabs row mx-0" id="myTab" role="tablist">
            <li
              onClick={() => setActiveType("salaried")}
              className="nav-item col-sm-6 col-7 px-0"
            >
              <p
                style={{ cursor: "pointer" }}
                className={`nav-link ${activeType === "salaried" ? "active" : ""}`}
                id="salaried-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="salaried"
                aria-selected="true"
              >
                Salaried Individual
              </p>
            </li>
            <li
              onClick={() => setActiveType("self-employed")}
              className="nav-item col-sm-6 col-5 px-0"
            >
              <p
                style={{ cursor: "pointer" }}
                className={`nav-link ${activeType === "self-employed" ? "active" : ""}`}
                id="self-employed-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="self-employed"
                aria-selected="false"
              >
                Self Employed
              </p>
            </li>
          </ul>
          <div
            className="tab-content"
            style={{
              borderTopLeftRadius:
                activeType === "self-employed" ? "50px" : "0px",
              borderTopRightRadius: activeType === "salaried" ? "50px" : "0px",
            }}
            id="myTabContent"
          >
            <div
              className={`tab-pane fade ${activeType === "salaried" ? "show active" : ""}`}
              id="salaried"
              role="tabpanel"
              aria-labelledby="salaried-tab"
            >
              <div className="row myTabContent_parts">
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="type_heading type_heading1">
                    Eligibility Criteria
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="type_heading type_heading1">
                    Documents Required
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="criteria">
                    <p className={"d-flex"}>
                      <img src="/assets/img/type1.png" alt="" /> Age : 21 - 55
                      yrs
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type2.png" alt="" /> Credit Score
                      &gt; 650{" "}
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type3.png" alt="" /> Net Monthly
                      Salary &gt; 15000
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type4.png" alt="" /> Serviceable
                      City
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type5.png" alt="" /> Indian National
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type6.png" alt="" /> Mode : Online
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="documents">
                    <div className="row">
                      <div className="col-6 px-0">
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>PAN Card</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>Aadhar Card</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>Electricity Bill</p>
                        </div>
                      </div>
                      <div className="col-6 px-0 my-3">
                        <div className="d-flex">
                          <img src="/assets/img/check.png" alt="" />
                          <p>
                            Last 3 months <br /> Bank Statement
                          </p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>
                            Last 3 months <br /> Salary slips
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade ${activeType === "self-employed" ? "show active" : ""}`}
              id="self-employed"
              role="tabpanel"
              aria-labelledby="self-employed-tab"
            >
              <div className="row myTabContent_parts">
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="type_heading type_heading1">
                    Eligibility Criteria
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="type_heading type_heading1">
                    Documents Required
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="criteria">
                    <p className={"d-flex"}>
                      <img src="/assets/img/type1.png" alt="" /> Age : 21 - 65
                      yrs
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type2.png" alt="" /> Business
                      Turnover &gt;= 3 Lakhs{" "}
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type3.png" alt="" /> Business
                      Vintage &gt;= 3 Months
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type4.png" alt="" /> Serviceable
                      City
                    </p>
                    <p className={"d-flex"}>
                      <img src="/assets/img/type5.png" alt="" /> Indian National
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12 myTabContent_part">
                  <div className="documents">
                    <div className="row">
                      <div className="col-6 px-0">
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>PAN Card - Individual</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>PAN Card - Company</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>Aadhar Card</p>
                        </div>
                      </div>
                      <div className="col-6 px-0">
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>GST Certificate</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>Electricity Bill</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>Last 2 Years ITR</p>
                        </div>
                        <div className="d-flex my-3">
                          <img src="/assets/img/check.png" alt="" />
                          <p>
                            Last 1 Year <br />
                            Bank Statement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="get_started_btn get_started_btn4 text-center">
          <Link to="/personal-loan">Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default DocumentsEligibility;
