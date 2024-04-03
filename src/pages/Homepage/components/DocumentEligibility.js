import React from 'react';

const DocumentsEligibility = () => {
    return (
        <section className="types">
            <div className="container m-auto">
                <div className="heading">
                    Documents Required & Eligibility Criteria
                </div>
                <div className="both-parts">
                    <ul className="nav nav-tabs row mx-0" id="myTab" role="tablist">
                        <li className="nav-item col-sm-6 col-7 px-0">
                            <a className="nav-link active" id="salaried-tab" data-toggle="tab" href="#salaried" role="tab" aria-controls="salaried" aria-selected="true">Salaried Individual</a>
                        </li>
                        <li className="nav-item col-sm-6 col-5 px-0">
                            <a className="nav-link" id="self-employed-tab" data-toggle="tab" href="#self-employed" role="tab" aria-controls="self-employed" aria-selected="false">Self Employed</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="salaried" role="tabpanel" aria-labelledby="salaried-tab">
                            <div className="row myTabContent_parts">
                                <div className="col-md-6 col-12 myTabContent_part">
                                    <div className="type_heading type_heading1">
                                        Eligibility Criteria
                                    </div>
                                    <div className="criteria">
                                        <p><img src="./asset/img/type1.png" alt=""/> Age : 21 - 55 yrs</p>
                                        <p><img src="./asset/img/type2.png" alt=""/> Credit Score &gt; 650 </p>
                                        <p><img src="./asset/img/type3.png" alt=""/> Net Monthly Salary &gt; 15000</p>
                                        <p><img src="./asset/img/type4.png" alt=""/> Serviceable City</p>
                                        <p><img src="./asset/img/type5.png" alt=""/> Indian National</p>
                                        <p><img src="./asset/img/type6.png" alt=""/> Mode : Online</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 myTabContent_part">
                                    <div className="type_heading type_heading1">
                                        Documents Required
                                    </div>
                                    <div className="documents">
                                        <div className="row">
                                            <div className="col-6 px-0">
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>PAN Card</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Aadhar Card</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Electricity Bill</p>
                                                </div>
                                            </div>
                                            <div className="col-6 px-0">
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Last 3 months <br/> Bank Statement</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Last 3 months <br/> Salary slips</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="self-employed" role="tabpanel" aria-labelledby="self-employed-tab">
                            <div className="row myTabContent_parts">
                                <div className="col-md-6 col-12 myTabContent_part">
                                    <div className="type_heading type_heading1">
                                        Eligibility Criteria
                                    </div>
                                    <div className="criteria">
                                        <p><img src="./asset/img/type1.png" alt=""/> Age : 21 - 65 yrs</p>
                                        <p><img src="./asset/img/type2.png" alt=""/> Business Turnover &gt;= 3 Lakhs </p>
                                        <p><img src="./asset/img/type3.png" alt=""/> Business Vintage &gt;= 3 Months</p>
                                        <p><img src="./asset/img/type4.png" alt=""/> Serviceable City</p>
                                        <p><img src="./asset/img/type5.png" alt=""/> Indian National</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 myTabContent_part">
                                    <div className="type_heading type_heading1">
                                        Documents Required
                                    </div>
                                    <div className="documents">
                                        <div className="row">
                                            <div className="col-6 px-0">
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>PAN Card - Individual</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>PAN Card - Company</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Aadhar Card</p>
                                                </div>
                                            </div>
                                            <div className="col-6 px-0">
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>GST Certificate</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Electricity Bill</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Last 2 Years ITR</p>
                                                </div>
                                                <div className="d-flex">
                                                    <img src="./asset/img/check.png" alt=""/>
                                                    <p>Last 1 Year <br/>Bank Statement</p>
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
                    <a href="https://digitmoney.in/personal-loan">Get Started</a>
                </div>
            </div>
        </section>
    );
}

export default DocumentsEligibility;
