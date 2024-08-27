export const formatAmount = (inputValue) => {
  let value = inputValue.replace(/[^\d]/g, "");

  let length = value.length;
  let formattedValue = "";

  if (length > 3) {
    let lastThree = value.slice(length - 3);
    let otherNumbers = value.slice(0, length - 3);
    otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    formattedValue = otherNumbers + "," + lastThree;
  } else {
    formattedValue = value;
  }

  return formattedValue;
};
