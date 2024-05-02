import React from "react";
import MainFooter from "./Homepage/components/MainFooter";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      <div className="w-full h-screen bg-black ">
        <div className="px-[110px] pt-20 ">
          <Link to={"/"}>
            <img src="/assets/img/Digit-Money-Logo.png" alt="" width={120} />
          </Link>
        </div>

        <div className="pt-24 text-center">
          <h1 className="text-[40px]  text-white">Contact us</h1>

          <a
            className="text-[98px] text-[#00a5ca] hover:text-[#00a5ca] decoration-transparent"
            href="mailto:hello@digitmoney.in"
          >
            {" "}
            hello@digitmoney.in{" "}
          </a>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Contact;
