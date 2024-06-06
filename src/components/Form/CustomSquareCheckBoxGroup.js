import { useState } from "react";

const CustomSquareCheckBoxGroup = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (option) => {
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
            className={`custom-square-checkbox-option${selectedValue === option.value ? " custom-square-checkbox-option-active" : ""}`}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </div>
        ))}
    </div>
  );
};

export default CustomSquareCheckBoxGroup;
