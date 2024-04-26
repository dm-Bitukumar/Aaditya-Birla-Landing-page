const FormButton = ({ className, type, ...props }) => {
  const handleCalculateStyles = () => {
    switch (type) {
      case "primary":
        return "continue-button";
      case "secondary":
        return "back-button";
      case "otp":
        return "btn-get-otp";
      default:
        return "continue-button";
    }
  };

  return (
    <button
      style={{ minWidth: "164px" }}
      className={`w-100 btn btn-lg ${handleCalculateStyles(type)} ${className}`}
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};

export default FormButton;
