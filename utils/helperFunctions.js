// Helper functions
function isNumber(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

function isAlphabet(char) {
  return /^[A-Za-z]$/.test(char);
}

function isSpecialCharacter(char) {
  return !/^[A-Za-z0-9]$/.test(char);
}

function processData(data) {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  const alphabetChars = [];

  data.forEach((item) => {
    if (isNumber(item)) {
      const num = parseInt(item);
      sum += num;

      if (num % 2 === 0) {
        evenNumbers.push(item.toString());
      } else {
        oddNumbers.push(item.toString());
      }
    } else if (item.length === 1 && isAlphabet(item)) {
      alphabets.push(item.toUpperCase());
      alphabetChars.push(item.toLowerCase());
    } else if (item.length > 1) {
      // Handle multi-character strings
      let hasAlpha = false;
      for (let char of item) {
        if (isAlphabet(char)) {
          hasAlpha = true;
          alphabetChars.push(char.toLowerCase());
        }
      }
      if (hasAlpha) {
        alphabets.push(item.toUpperCase());
      }
    } else if (isSpecialCharacter(item)) {
      specialCharacters.push(item);
    }
  });

  // Create concatenation string with alternating caps in reverse order
  const reversedChars = alphabetChars.reverse();
  let concatString = "";
  reversedChars.forEach((char, index) => {
    concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
  });

  return {
    oddNumbers,
    evenNumbers,
    alphabets,
    specialCharacters,
    sum: sum.toString(),
    concatString,
  };
}

module.exports = {
    isNumber,
    isAlphabet,
    isSpecialCharacter,
    processData
}