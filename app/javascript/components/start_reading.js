const startReading = () => {
  const startButton = document.getElementById('start');
  const startContainer = document.querySelector('.start-container');
  const poemContent = document.querySelector('.poem-reading-content');
  const progress = document.getElementById('reading-progress-bar');
  startButton.addEventListener('click', (event) => {
    startContainer.classList.add('hidden');
    poemContent.classList.remove('hidden');
    progress.classList.remove('hidden');
  });
}

export { startReading };
