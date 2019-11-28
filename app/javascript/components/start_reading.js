const startReading = () => {
  const startButton = document.getElementById('start');
  const startContainer = document.querySelector('.start-container');
  const poemContent = document.querySelector('.poem-reading-content');
  startButton.addEventListener('click', (event) => {
    startContainer.classList.add('hidden');
    poemContent.classList.remove('hidden');
    poemContent.classList.add('test')
  });
}

export { startReading };
