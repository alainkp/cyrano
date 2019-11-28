const startReading = () => {
  const startButton = document.getElementById('start');
  const startContainer = document.querySelector('.start-container');
  const poemContent = document.querySelector('.poem-reading-content');
  const progressReading = document.getElementById('reading-progress-bar');
  const nextBtn = document.querySelector('.container-next-btn');

  console.log(progressReading);
  console.log(nextBtn);

  startButton.addEventListener('click', (event) => {
    startContainer.classList.add('hidden');
    poemContent.classList.remove('hidden');
    progressReading.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
  });
}

export { startReading };
