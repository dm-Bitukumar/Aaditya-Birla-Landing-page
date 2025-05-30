const eligibilityData = {
    tabs: ["Personal Loan", "Business Loan", "PayOff"],
    content: {
      "Personal Loan": {
        criteria: [
          { icon: "/assets/img/Age.svg", title: "Age", subtitle: "21 - 55 yrs" },
          { icon: "/assets/img/cibil.svg", title: "Credit Score", subtitle: "> 650" },
          { icon: "/assets/img/city.svg", title: "Serviceable Area", subtitle: "Metro Cities" },
          { icon: "/assets/img/Nationality.svg", title: "Nationality", subtitle: "Indian" },
          { icon: "/assets/img/salary.svg", title: "Monthly Salary", subtitle: "> 15000" },
          { icon: "/assets/img/mode.svg", title: "Mode", subtitle: "Online" },
        ],
        documents: [
          { icon: "/assets/img/Pan.svg", label: "PAN Card" },
          { icon: "/assets/img/aadhar.svg", label: "Aadhaar Card" },
          { icon: "/assets/img/electricity.svg", label: "Electricity Bill" },
          { icon: "/assets/img/bank.svg", label: "Last 3 Months Bank Statement" },
          { icon: "/assets/img/salary slip.svg", label: "Last 3 Months Salary Slips" },
        ],
      },
      "Business Loan": {
        criteria: [
          { icon: "/assets/img/Age.svg", title: "Age", subtitle: "25 - 60 yrs" },
          { icon: "/assets/img/cibil.svg", title: "Credit Score", subtitle: "> 700" },
          { icon: "/assets/img/city.svg", title: "Area", subtitle: "Tier 1 & 2 Cities" },
          { icon: "/assets/img/Nationality.svg", title: "Nationality", subtitle: "Indian" },
          { icon: "/assets/img/salary.svg", title: "Annual Turnover", subtitle: "> ₹5 Lakhs" },
          { icon: "/assets/img/mode.svg", title: "Mode", subtitle: "Online/Offline" },
        ],
        documents: [
          { icon: "/assets/img/Pan.svg", label: "Business PAN Card" },
          { icon: "/assets/img/aadhar.svg", label: "Aadhaar Card of Owner" },
          { icon: "/assets/img/electricity.svg", label: "Utility Bill" },
          { icon: "/assets/img/bank.svg", label: "6 Months Bank Statement" },
          { icon: "/assets/img/salary slip.svg", label: "GST Returns" },
        ],
      },
      "PayOff": {
        criteria: [
          { icon: "/assets/img/Age.svg", title: "Age", subtitle: "21 - 60 yrs" },
          { icon: "/assets/img/cibil.svg", title: "Credit Score", subtitle: "> 630" },
          { icon: "/assets/img/city.svg", title: "Area", subtitle: "Pan India" },
          { icon: "/assets/img/Nationality.svg", title: "Nationality", subtitle: "Indian" },
          { icon: "/assets/img/salary.svg", title: "Salary", subtitle: "> ₹10,000" },
          { icon: "/assets/img/mode.svg", title: "Mode", subtitle: "Online" },
        ],
        documents: [
          { icon: "/assets/img/Pan.svg", label: "PAN Card" },
          { icon: "/assets/img/aadhar.svg", label: "Aadhaar Card" },
          { icon: "/assets/img/electricity.svg", label: "Address Proof" },
          { icon: "/assets/img/bank.svg", label: "Bank Statement" },
          { icon: "/assets/img/salary slip.svg", label: "Existing Loan Statement" },
        ],
      },
    },
  };
  
  export default eligibilityData;
  