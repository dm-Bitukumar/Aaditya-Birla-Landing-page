const amountInput = document.getElementById("amount");
const amountTextInput = document.getElementById("amount-input");
const interestRateInput = document.getElementById("interest-rate");
const interestRateTextInput = document.getElementById("interest-rate-input");
const termInput = document.getElementById("term");
const termTextInput = document.getElementById("term-input");
// const resultDiv = document.getElementById("result");
const resultDiv1 = document.getElementById("result1");
const resultDiv2 = document.getElementById("result2");
const resultDiv3 = document.getElementById("result3");

function calcAmount() {
  const amount = Number(amountInput.value) || Number(amountTextInput.value);
  amountTextInput.innerHTML = `${Math.round(amount).toLocaleString("en-IN")}`;
}
function calculateResult1() {
  const amount = Number(amountInput.value) || Number(amountTextInput.value);
  const interestRate =
    Number(interestRateInput.value) || Number(interestRateTextInput.value);
  const years = Number(termInput.value) || Number(termTextInput.value);

  const monthlyInterestRate = interestRate / 100 / 12;
  const totalInstallments = years * 12;

  const emi =
    (amount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalInstallments))) /
    (Math.pow(1 + monthlyInterestRate, totalInstallments) - 1);

  // const tenure = years * 12;
  // const rate = parseFloat(interestRate) / 100 / 12;
  // const memi =
  //   (amount * rate * Math.pow(1 + rate, tenure)) /
  //   [Math.pow(1 + rate, tenure) - 1];
  resultDiv1.innerHTML = `${Math.round(emi).toLocaleString("en-IN")}`;
  // resultDiv.innerHTML = `If you invest $${amount.toFixed(2)} today at a ${interestRate * 100}% annual interest rate, it will grow to $${futureValue.toFixed(2)} in ${years} years.`;
}

function calculateResult2() {
  const amount = Number(amountInput.value) || Number(amountTextInput.value);
  const principalamt = amount;
  resultDiv2.innerHTML = `${Math.round(principalamt).toLocaleString("en-IN")}`;
}

// function calculateResult3() {
//   const amount = Number(amountInput.value) || Number(amountTextInput.value);
//   const interestRate =
//     Number(interestRateInput.value) || Number(interestRateTextInput.value);
//   const years = Number(termInput.value) || Number(termTextInput.value);

  // const monthlyInterestRate = interestRate / 100 / 12;
  // const totalInstallments = years * 12;
  // const emi =
  //   (amount *
  //     (monthlyInterestRate *
  //       Math.pow(1 + monthlyInterestRate, totalInstallments))) /
  //   (Math.pow(1 + monthlyInterestRate, totalInstallments) - 1);
  // const totalinterest = emi * years;
//   const tenure = years * 12;
//   const rate = parseFloat(interestRate) / 100 / 12;
//   const memi =
//     (amount * rate * Math.pow(1 + rate, tenure)) /
//     [Math.pow(1 + rate, tenure) - 1];
//   const totalamount = memi * tenure;
//   const totalinterest = totalamount - amount;
//   resultDiv3.innerHTML = `${Math.round(totalinterest).toLocaleString("en-IN")}`;
// }

function calculateResult3() {
  const amount = Number(amountInput.value) || Number(amountTextInput.value);
  const interestRate =
    Number(interestRateInput.value) || Number(interestRateTextInput.value);
  const years = Number(termInput.value) || Number(termTextInput.value);
  const tenure = years * 12;
  const rate = parseFloat(interestRate) / 100 / 12;
  const memi =
    (amount * rate * Math.pow(1 + rate, tenure)) /
    [Math.pow(1 + rate, tenure) - 1];
  const totalamount = memi * tenure;
  resultDiv3.innerHTML = `${Math.round(totalamount).toLocaleString("en-IN")}`;
}
calcAmount(); // Calculate the initial value
calculateResult1();
calculateResult2();
calculateResult3();
amountInput.addEventListener("input", function () {
  amountTextInput.value = amountInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});

amountTextInput.addEventListener("input", function () {
  amountInput.value = amountTextInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});

interestRateInput.addEventListener("input", function () {
  interestRateTextInput.value = interestRateInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});

interestRateTextInput.addEventListener("input", function () {
  interestRateInput.value = interestRateTextInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});

termInput.addEventListener("input", function () {
  termTextInput.value = termInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});

termTextInput.addEventListener("input", function () {
  termInput.value = termTextInput.value;
  calcAmount();
  calculateResult1();
  calculateResult2();
  calculateResult3();
});
