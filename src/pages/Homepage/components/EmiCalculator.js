import { useState } from "react";
import { Link } from "react-router-dom";
import { convertNumberToIndianFormat } from "../../../utility/numberUtility";
import { getUserMetaData } from "../../../utility/getUserMetaData";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(5);

  const handleLoanAmountChange = (e) => {
    setLoanAmount(parseInt(e.target.value));
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value));
  };

  const handleLoanTenureChange = (e) => {
    setLoanTenure(parseInt(e.target.value));
  };

  const calculateTotalAmountPayable = (
    loanAmount,
    interestRate,
    loanTenure
  ) => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTenure * 12;
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyEMI = (loanAmount * monthlyInterestRate * x) / (x - 1);
    const totalAmountPayable = monthlyEMI * numberOfPayments;
    return convertNumberToIndianFormat(Math.round(totalAmountPayable));
  };

  const calculateMonthlyEMI = (loanAmount, interestRate, loanTenure) => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = loanTenure * 12;
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyEMI = (loanAmount * monthlyInterestRate * x) / (x - 1);
    return convertNumberToIndianFormat(Math.round(monthlyEMI));
  };

  return (
    <section className="emi" id="emi">
      <div className="container m-auto">
        <div className="heading">
          <div className="main_heading">
            EMI <span>Calculator</span>
          </div>
          <div className="sub_heading">
            Find out your EMI, crunch your numbers.
          </div>
        </div>
        <div className="row calculate">
          <div className="col-md-6 col-12 left_part">
            <div className="form">
              <div className="row">
                <label htmlFor="amount" className="col-12">
                  Loan Amount
                </label>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <span className="symbol-input rupees-input">₹</span>
                    <input
                      type="text"
                      className="range-input w-100 amount-input"
                      id="amount-input"
                      name="amount-input"
                      value={loanAmount}
                      onChange={handleLoanAmountChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ padding: "0 10px" }}>
                <input
                  type="range"
                  className="px-0 col-12"
                  id="amount"
                  name="amount"
                  min="10000"
                  max="10000000"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                />
              </div>
              <div className="row">
                <label htmlFor="interest-rate" className="col-12">
                  Rate of Interest (p.a.)
                </label>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <input
                      type="text"
                      className="range-input w-100 interest-rate-input"
                      id="interest-rate-input"
                      name="interest-rate-input"
                      min="1"
                      max="30"
                      value={interestRate}
                      onChange={handleInterestRateChange}
                    />
                    <span className="symbol-input rate-input">%</span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ padding: "0 10px" }}>
                <input
                  type="range"
                  className="px-0 col-12"
                  id="interest-rate"
                  name="interest-rate"
                  min="1"
                  max="30"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                />
              </div>
              <div className="row">
                <label htmlFor="term" className="col-12">
                  Loan Tenure
                </label>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="d-flex justify-content-end">
                    <input
                      type="text"
                      className="range-input w-100 term-input"
                      id="term-input"
                      name="term-input"
                      min="1"
                      max="30"
                      value={loanTenure}
                      onChange={handleLoanTenureChange}
                    />
                    <span className="symbol-input period-input">years</span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ padding: "0 10px" }}>
                <input
                  type="range"
                  className="px-0 col-12"
                  id="term"
                  name="term"
                  min="1"
                  max="30"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 right_part">
            <div className="card row">
              <div className="px-0 col-sm-12 col-6 row up_part">
                <div className="px-0 col-sm-6 col-12 total_payble">
                  <p className="mb-1">Total Payable</p>
                  <p>
                    ₹{" "}
                    <span id="result3">
                      {calculateTotalAmountPayable(
                        loanAmount,
                        interestRate,
                        loanTenure
                      )}
                    </span>
                  </p>
                </div>
                <div className="px-0 col-sm-6 col-12 principle_amount">
                  <p className="mb-1">Principle amount</p>
                  <p>
                    ₹{" "}
                    <span id="result2">
                      {convertNumberToIndianFormat(loanAmount)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="px-0 col-sm-12 col-6 row down_part">
                <div className="px-0 col-12 monthly_emi">
                  <p>Monthly EMI</p>
                  <p className={"my-3"}>
                    ₹{" "}
                    <span id="result1">
                      {calculateMonthlyEMI(
                        loanAmount,
                        interestRate,
                        loanTenure
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center get_started_btn get_started_btn3">
              <Link
                to="/personal-loan"
                onClick={() => {
                  getUserMetaData({
                    event_name: "get_started",
                  });
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div style={{ height: "24px" }}>
          <img src="/assets/img/mobile.png" alt="" className="side-mobile" />
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;
