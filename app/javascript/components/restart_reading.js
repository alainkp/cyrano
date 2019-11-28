const restartReading = () => {
  if (document.getElementById('restart')) {
    const restartButton = document.getElementById('restart');
    const poemLines = document.querySelectorAll('.poem-reading-content p');
    const poemContent = document.querySelector('.poem-reading-content')
    restartButton.addEventListener('click', (event) => {
      poemContent.scroll(0, 0);
      poemLines.forEach((line) => {
        if (document.querySelector('.poem-reading-line-viewed')) {
          line.classList.remove('poem-reading-line-viewed')
        } if (document.querySelector('.poem-reading-line')) {
          line.classList.remove('poem-reading-line')
        }
        line.classList.add('poem-reading-line-hidden')
      });
      const firstLine = document.querySelector('.poem-reading-line-hidden');
      firstLine.classList.remove('poem-reading-line-hidden');
      firstLine.classList.add('poem-reading-line');
    });
  }
}

export { restartReading }
