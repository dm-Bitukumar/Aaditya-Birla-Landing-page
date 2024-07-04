import HeadBar from "../../components/Static/HeadBar";
import FormButton from "../../components/Buttons/FormButton";
import { useState, useEffect } from "react";
import PreApprovedForm from "./components/PreApprovedForm";
import { useSearchParams } from "react-router-dom";
import callApi from "../../utility/apiCaller";
import { setUserClickData } from "../../utility/setUserClickData";

const PreApprovedLoan = () => {
  const [loans, setLoans] = useState(true);
  const [params] = useSearchParams();
  const [preLoans, setPreLoans] = useState(null);
  const [contactName, setContactName] = useState("");

  useEffect(() => {
    if (params.get("id")) fetchPreApprovedLoan(params.get("id"));
  }, [params]);

  const fetchPreApprovedLoan = async (id) => {
    try {
      const res = await callApi(`v1/preapproved_lead/${id}`, "get", {}, "core");

      if (res.status === "Success") {
        setPreLoans(res.data?.preapproved_lead);
        let str1 = res.data?.preapproved_lead?.contact_name;
        let str = "";
        for (let i = 0; i < str1?.length; i++) {
          if (str1[i] !== " ") {
            str += str1[i];
          } else {
            break;
          }
        }
        setContactName(str);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    setUserClickData({
      event_name: "disbursment-button",
    });
    setLoans(false);
  };
  return (
    <>
      {loans ? (
        <div
          className={"personal-loan-container"}
          style={{
            // border: "1px solid #e1e1e1",
            borderRadius: "5px",
            maxHeight: "100vh",
          }}
        >
          <HeadBar />
          <div className="flex items-center justify-center ">
            <img
              width={110}
              height={90}
              src="/assets/img/logo.png"
              alt=""
              style={{ marginTop: "0.7em" }}
            />
          </div>
          <div className={"flex"} style={{ marginTop: "1em" }}>
            <img src="assets/img/pre_approved_img.png" />
          </div>
          <div
            className="flex flex-col items-center justify-around my-3"
            style={{
              // border: "1px solid #e1e1e1",
              borderRadius: "12px",
              boxShadow: "0px 0px 3px 2px rgba(0, 0, 0, 0.15)",
              padding: "1.25em",
              maxHeight: "100vh",
            }}
          >
            <h3
              style={{
                width: "113.3%",
                marginTop: "-1em",
                display: "flex",
                justifyContent: "space-around",
                background: "#d9f6ff",
                padding: "0.7em 0.716em",
                borderRadius: "12px 12px 0 0",
                fontWeight: "600",
                fontSize: "1.25em",
              }}
            >
              Congratulations {contactName} !
            </h3>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "0.7em 0",
              }}
            >
              <div>
                <span style={{ fontSize: "1em", fontWeight: "600" }}>
                  You have a loan of:
                </span>
                <span
                  style={{ display: "flex", color: "black", fontWeight: "600" }}
                >
                  <img src="assets/img/rupee_img.svg" width={30} />
                  <h3 style={{ fontSize: "2em" }}>{preLoans?.loan_amount}</h3>
                </span>
              </div>
              <div>
                <span style={{ fontSize: "1em", fontWeight: "600" }}>
                  At an EMI of:
                </span>
                <span style={{ display: "flex", fontWeight: "600" }}>
                  <img
                    src="assets/img/rupee_img.svg"
                    width={30}
                    height={30}
                    style={{ color: "#111" }}
                  />
                  <h3 style={{ fontSize: "2em" }}>{preLoans?.loan_emi}</h3>
                </span>
              </div>
            </div>

            <FormButton
              style={{
                margin: "12px 0",
                fontWeight: "600",
                width: "90%",
              }}
              className=" w-100 btn btn-lg btn-primary btn-get-otp"
              type="submit"
              onClick={handleSubmit}
              id="myBtn"
            >
              DISBURSE NOW
            </FormButton>

            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0.5em 0",
                fontSize: "0.8em",
                color: "#a7958a",
                fontWeight: "600",
                alignItems: "center",
              }}
              // style={{ color: "#d9f6ff" }}
            >
              <img
                src="assets/img/instant_img.png"
                width={45}
                alt=""
                style={{ paddingRight: "1em" }}
              />
              <span>Instant Approvals</span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0.5em 0",
                fontSize: "0.8em",
                color: "#a7958a",
                fontWeight: "600",
                alignItems: "center",
              }}
            >
              <img
                src="assets/img/complete_digital.png"
                width={45}
                alt=""
                style={{ paddingRight: "1em" }}
              />
              <span>Complete Digital Process</span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0.5em 0",
                fontSize: "0.8em",
                color: "#a7958a",
                fontWeight: "600",
                alignItems: "center",
              }}
            >
              <img
                src="assets/img/quick_disbursal.png"
                width={45}
                height={40}
                alt=""
                style={{ paddingRight: "1em" }}
              />
              <span>Quick Disbursal</span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "0.5em 0",
                fontSize: "0.8em",
                color: "#a7958a",
                fontWeight: "600",
                alignItems: "center",
              }}
            >
              <img
                src="assets/img/guaranter_img.png"
                width={45}
                height={40}
                alt=""
                style={{ paddingRight: "1em" }}
              />
              <span>No Gurantors</span>
            </div>
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              margin: "1.25em",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                fontSize: "0.8em",
                color: "#111",
              }}
            >
              Powered by
            </span>
            <img width={110} src={preLoans?.logo_image_url} alt="img" />
          </div>
        </div>
      ) : (
        <PreApprovedForm data={preLoans} />
      )}
    </>
  );
};

export default PreApprovedLoan;
