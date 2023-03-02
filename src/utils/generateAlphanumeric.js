export const generateAlphanumeric = () => {
  const alphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9"];

  const alphanumeric =
    getRandomValue(alphabets) +
    getRandomValue(alphabets) +
    getRandomValue(alphabets) +
    getRandomValue(numbers) +
    getRandomValue(numbers);
  return alphanumeric;
};

const getRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
