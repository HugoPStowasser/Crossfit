export const removeNumber = (numericValue: number) => {
  let _value = numericValue.toString();
  /*
  add zero at begin, remove last character and swap comma (,) to left number
  - numericValue = 123.45
  - _value = 0123.45
  - _value = 0123.4
  - dotIndex = 4
  - auxNum = 3
  - make for to swap
  - _value = 012.34

  P.S: zero at begins works to not broke when removing last number, to not have NaN
  */
  _value = `0${_value}`;
  _value = _value.slice(0, -1);
  const dotIndex = _value.lastIndexOf(".");
  const auxNum = _value.charAt(dotIndex - 1);
  const auxString = _value;
  _value = "";

  for (let i = 0; i < auxString.length; i += 1) {
    if (i === dotIndex) {
      _value = _value.concat(auxNum);
    } else if (i === dotIndex - 1) {
      _value = _value.concat(".");
    } else {
      _value = _value.concat(auxString.charAt(i));
    }
  }

  return _value;
};

export const insertNewValue = (
  monetaryStringValue: string,
  minimumFractionDigits: number,
  symbol: string
) => {
  // remove R$, remove all dots, replace , to . and trim
  let stringCurrency = monetaryStringValue
    .replace(symbol, "")
    .replaceAll(".", "")
    .replace(",", ".")
    .trim();
  let dotIndex = stringCurrency.lastIndexOf(".");

  // first number pressed
  if (dotIndex === -1) {
    const newInput = stringCurrency;
    stringCurrency = "0.";
    // add the correct amount of 0.0...n
    for (let i = 0; i < minimumFractionDigits; i += 1) {
      stringCurrency = stringCurrency.concat("0");
    }
    // add the number inputed at the end 0.0...newInput
    stringCurrency = stringCurrency.concat(newInput);
  }

  // get fractions items, 0.[0...x]
  const fractionals = stringCurrency.split(".")[1];

  // if bigger was added at the fractions, else it was added in integer part
  if (fractionals.length > minimumFractionDigits) {
    /*
      - find the dot and next number after, and make the change
      - number = 1.523
      - fractionals = 523
      - fractionals.length = 3
      - minimumFractionDigits = 2
      - dotIndex = 1
      - auxNum = 5
      - stringCurrency will be 15.23
      */
    dotIndex = stringCurrency.lastIndexOf(".");
    const auxNum = stringCurrency.charAt(dotIndex + 1);
    const auxString = stringCurrency;
    stringCurrency = "";

    // its not fraction, just concat at the begin// this for will make 25.566 into 255.66
    for (let i = 0; i < auxString.length; i += 1) {
      if (i === dotIndex) {
        // at the place of . input the 5
        stringCurrency = stringCurrency.concat(auxNum);
      } else if (i === dotIndex + 1) {
        // at the place of 5 input the .
        stringCurrency = stringCurrency.concat(".");
      } else {
        // just copy
        stringCurrency = stringCurrency.concat(auxString.charAt(i));
      }
    }
  }

  return stringCurrency;
};
