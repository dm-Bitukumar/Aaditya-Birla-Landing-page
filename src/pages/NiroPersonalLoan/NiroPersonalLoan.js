import { useState } from "react";
import "./css/personal-loan.css";
import Form from "./components/Form";
import HeadBar from "../../components/Static/HeadBar";

const PersonalLoan = () => {
  return (
    <div className={"personal-loan-container"}>
      <HeadBar />
      <Form />
    </div>
  );
};

export default PersonalLoan;
