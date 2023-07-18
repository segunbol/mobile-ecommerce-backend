export const subtract = (a, b) => {
    var result = '';
    var borrow = 0;
    a = a.split('');
    b = b.split('');
  
    while (a.length || b.length) {
      var digitA = ~~a.pop() || 0;
      var digitB = ~~b.pop() || 0;
  
      // Apply borrowing if necessary
      if (digitA < digitB + borrow) {
        digitA += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
  
      var subtractedDigit = digitA - digitB - borrow;
      result = subtractedDigit + result;
    }
  
    return result;
  };


export const addLargeNumber = (a, b) => {
const numA = BigInt(a);
const numB = BigInt(b);
const sum = numA + numB;
return Number(sum);
};

const addLargeNumbers = (x, y) => {
  var result = "";
  var carry = 0;
  for (var i = Math.max(x.length, y.length); i >= 0; i--) {
    var digitX = i < x.length ? x[i] - "0" : 0;
    var digitY = i < y.length ? y[i] - "0" : 0;
    var sumDigit = digitX + digitY + carry;
    carry = sumDigit > 9;
    result = (sumDigit % 10) + result;
  }
  if (carry > 0) {
    result = carry + result;
  }
  console.log("hehe")
  return result;
}

const displayLargeNumber = (number) => {
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
}

const x = "1234567890123456789";
const y = "9876543210987654321";
const sum = addLargeNumbers(x, y);
const formattedSum = displayLargeNumber(sum);
console.log(formattedSum); // 1111111110111111111

// const van = "5000000000000000000000000000000000000000"
// const ban = "4654320000000000000000000000000000000000"
// const can = addLargeNumbers (van, ban)
// const fan = parseInt(can)
// console.log(can)

function caddLargeNumbers(x, y) {
  var result = "";
  var carry = 0;
  for (var i = Math.max(x.length, y.length); i >= 0; i--) {
    var digitX = i < x.length ? x[i] - "0" : 0;
    var digitY = i < y.length ? y[i] - "0" : 0;
    var sumDigit = digitX + digitY + carry;
    carry = sumDigit > 9;
    result = (sumDigit % 10) + result;
  }
  if (carry > 0) {
    result = carry + result;
  }
  return result;
}

function displayLargeNumbers(number) {
  var result = "";
  var i = number.length - 1;
  while (i >= 0) {
    result = number[i] + result;
    i--;
  }
  return result;
}


var xs = "1234567890123456789";
var ys = "9876543210987654321";
var sums = caddLargeNumbers(xs, ys);
console.log(displayLargeNumbers(sums)); // 1111111110111111111
