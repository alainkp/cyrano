const createPoemArray = () => {
  const poem = document.querySelector('.hidden-poem').innerText;
  const wordsPoem = poem.replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").split(' ');
  console.log(wordsPoem)
  return wordsPoem;
}

export { createPoemArray };
