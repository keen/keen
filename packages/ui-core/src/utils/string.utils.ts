export const truncate = (input: string, maxLength = 25) => {
  if (input.length <= maxLength) return input;
  const words = input.split(' ');
  let output = '';
  let numberOfOutputCharacters = 0;
  words.some((word, index) => {
    const wordLength = word.length;
    numberOfOutputCharacters += wordLength;
    if (index > 0) {
      numberOfOutputCharacters += 1;
    }
    if (numberOfOutputCharacters <= maxLength) {
      output += addSpace(word, index);
    } else if (numberOfOutputCharacters > maxLength) {
      const numberOfCharactersExceeded = numberOfOutputCharacters - maxLength;
      const numberOfCharactersToShow = wordLength - numberOfCharactersExceeded;
      if (numberOfCharactersToShow < 2) {
        output += '...';
        return true;
      }
      output += addSpace(
        word.substring(0, numberOfCharactersToShow) + '...',
        index
      );
      return true;
    } else {
      output += '...';
      return true;
    }
  });
  return output;
};

const addSpace = (word: string, index: number) => {
  if (index > 0) {
    return ' ' + word;
  }
  return word;
};
