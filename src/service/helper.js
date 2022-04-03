export function CapitalFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ThreeDigitNumber(number) {
  if (number < 10) {
    return "00" + number;
  } else if (number < 100) {
    return "0" + number;
  }
  return number;
}

export const api = 'https://pokeapi.co/api/v2';
