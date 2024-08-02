const numberToWords = (num) => {
  if (num === 0) return "zero";

  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const scales = ["", "thousand", "lakh", "crore"];

  const getBelowHundred = (n) => {
    if (n < 10) return ones[n];
    if (n > 10 && n < 20) return teens[n - 10];
    return tens[Math.floor(n / 10)] + (n % 10 > 0 ? " " + ones[n % 10] : "");
  };

  const getBelowThousand = (n) => {
    if (n < 100) return getBelowHundred(n);
    return (
      ones[Math.floor(n / 100)] +
      " hundred " +
      (n % 100 > 0 ? getBelowHundred(n % 100) : "")
    );
  };

  const convertToWords = (n) => {
    let words = "";
    const chunks = [];
    const scaleNames = scales.slice(0);

    // Break the number into chunks based on Indian numbering system
    while (n > 0) {
      if (chunks.length === 1) {
        // Handle the thousand separately, as it might have more than 3 digits in Indian system
        chunks.push(n % 100);
        n = Math.floor(n / 100);
      } else {
        chunks.push(n % 1000);
        n = Math.floor(n / 1000);
      }
    }

    // Process each chunk
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i] > 0) {
        words =
          getBelowThousand(chunks[i]) +
          (scaleNames[i] ? " " + scaleNames[i] : "") +
          " " +
          words;
      }
    }

    return words.trim();
  };

  return convertToWords(num);
};

export default numberToWords;
