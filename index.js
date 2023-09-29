function censor() {
  const arrayOfPairs = [];
  return function(value, newValue = undefined) {
    if (newValue) {
      arrayOfPairs.push(value, newValue);
    } else {
      const arrayOfWords = value.split(' ');
      const arrayOfPairsLowerCase = arrayOfPairs.map((word) => word.toLowerCase());
      arrayOfWords.forEach((word, i) => {
        if (arrayOfPairsLowerCase.includes(word.toLowerCase())) {
          const index = arrayOfPairsLowerCase.indexOf(word.toLowerCase());
          arrayOfWords[i] = arrayOfPairs[index + 1];
        }
      });
      return arrayOfWords.join(' ');
    }
  }
}

const changeScene = censor();
changeScene('PHP', 'JS');
changeScene('backend', 'frontend');
console.log(changeScene('PHP is the most popular programming language for backend web-development'));
