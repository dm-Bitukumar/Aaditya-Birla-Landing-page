import { useState } from "react";
import { setUserClickData } from "../../utility/setUserClickData";
import { setUserClickData } from "../../utility/setUserClickData";

const CustomSquareCheckBoxGroup = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (option) => {
    setUserClickData({
      event_name: "check-box-tick",
    });
    setSelectedValue(option.value);
    onSelect(option.value);
  };

  return (
    <div className={"custom-square-checkbox-group"}>
      {options &&
        options.length !== 0 &&
        options.map((option, index) => (
          <div
            key={index}
            className={`custom-square-checkbox-option${
              selectedValue === option.value
                ? " custom-square-checkbox-option-active"
                : ""
            }`}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </div>
        ))}
    </div>
  );
};

export default CustomSquareCheckBoxGroup;
