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

export function NameAbbreviations(name) {
  let newName = name.split("-",);
  let fullName = "";

  for(let i = 0; i < newName.length; i++) {
    if(i > 0) {
      fullName += " ";
  }
    fullName += newName[i];
    if(newName[i] === "mr" || newName[i] === "jr") {
      fullName += ".";
    }
  }

  return fullName;
}

export const api = "https://pokeapi.co/api/v2";
