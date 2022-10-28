const keyToCapitalize = (key, separator) => {
  const splitString = key.split(separator);
  return splitString
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
};

export { keyToCapitalize };
