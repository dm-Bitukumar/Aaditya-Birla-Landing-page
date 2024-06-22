//import { useNavigate } from "react-router-dom";
//import { protag } from "../../images";
import style from "./radiobutton.module.css";
//import { regiserOTPURL } from "../helpers/constant-words";

const RadioButton = ({
  label,

  labelId,
  value,
  userGenderHandler,
  keyName,
  isPro,
  extraSpace = false,
  yearBox = false,
  checked,
}) => {
  return (
    <>
      <input
        className={style.radio_input}
        checked={checked}
        type="radio"
        value={value}
        id={labelId}
        onChange={(e) => userGenderHandler(keyName, e.target.value)}
      />
      <label
        className={`${style.radio_label} ${
          extraSpace === true && style.extraSpace
        }`}
        htmlFor={labelId}
      >
        {label}
      </label>
      {/* </li> */}
    </>
  );
};

export default RadioButton;
