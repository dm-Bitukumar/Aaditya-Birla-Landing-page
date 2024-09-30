const FormButton = ({ className, type, ...props }) => {
  const handleCalculateStyles = () => {
    switch (type) {
      case "primary":
        return props.small ? "continue-button-sm" : "continue-button";
      case "secondary":
        return "back-button";
      case "otp":
        return "btn-get-otp";
      default:
        return props.small ? "continue-button-sm" : "continue-button";
    }
  };

  return (
    <button
      style={{
        whiteSpace: "nowrap",
        fontSize: "0.85em",
        fontWeight: "600",
      }}
      className={` btn btn-lg ${handleCalculateStyles(type)} ${className}`}
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
