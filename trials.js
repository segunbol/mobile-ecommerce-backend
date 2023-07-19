import BigNumber from "bignumber.js"

const addLargeNumbers = (x, y) => {
  var result = "";
  var carry = 0;
  for (var i = Math.max(x.length, y.length) - 1; i >= 0; i--) {
    var digitX = i < x.length ? parseInt(x[i]) : 0;
    var digitY = i < y.length ? parseInt(y[i]) : 0;
    var sumDigit = digitX + digitY + carry;
    carry = sumDigit > 9 ? 1 : 0;
    result = (sumDigit % 10) + result;
  }
  if (carry > 0) {
    result = carry + result;
  }
  return result;
};

const displayLargeNumbers = (number) => {
  var result = "";
  var i = 0;
  while (number > 0) {
    var digit = number % 10;
    result = digit + result;
    number = Math.floor(number / 10);
    i++;
    if (i % 3 === 0 && number !== 0) {
      result = "," + result;
    }
  }
  return result;
};


const x = "1234567890123456789";
const y = "98765432109876543219595959595";
const sum = addLargeNumbers(x, y);
console.log(sum)
const formattedSum = displayLargeNumbers(88228373);
const ran = parseInt(sum)
console.log(formattedSum); 



// const addLargeNumber = (x, y) => {
//   const bigX = new BigNumber(x);
//   const bigY = new BigNumber(y);
//   const sum = bigX.plus(bigY);
//   const result = parseFloat(sum)
//   return result
// };

// // Example usage
// const number1 = '123456789012345678901234567890';
// const number2 = '987654321098765432109876543210';
// const sump = addLargeNumber(number1, number2);
// console.log(sump); // Output: 111111111011111111101111111100
// const number = 1.1111111101111111e+30;
// const formattedNumber = number.toLocaleString('en', { maximumFractionDigits: 0 });
// console.log(typeof formattedNumber);
// const iuo = "000000000000000000500000"
// const nuber = "0000000000000000010000000"
// const buba = iuo + nuber
// const nuba = parseFloat(iuo + nuber)
// const auba = String(nuba)
// console.log(buba)
// console.log(nuba)
// console.log(typeof auba)

