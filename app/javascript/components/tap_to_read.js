import ProgressBar from "progressbar.js";
import { successModal } from '../components/success_modal.js'

const initReadingProgressBar = () => {
  const readingProgressBar = document.getElementById('reading-progress-bar');
  if (readingProgressBar) {
     const bar = new ProgressBar.SemiCircle(readingProgressBar, {
      strokeWidth: 9,
      color: '#1A9AD6',
      trailColor: '#E5E5E5',
      trailWidth: 5,
      easing: 'easeInOut',
      duration: 500,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      step: (state, bar) => {
        const value = Math.round(bar.value() * 100);
        bar.setText(`${value}%`);
        bar.text.style.color = '#1A9AD6';
      }
    });

    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '2rem';
    return bar
  }
}
const bar = initReadingProgressBar();

const readingProgressBar = () => {
  let overallProgression = 0;
  const poemOverallLength = document.querySelectorAll('.poem-reading-content p').length;
  let unreadLinesLength = document.querySelectorAll('.poem-reading-line-hidden').length;
  let progression = 100 - (unreadLinesLength * 100 / poemOverallLength);
  overallProgression += Number.parseInt(progression,10);
  return overallProgression/100
}

const restartReading = () => {
  if (document.getElementById('restart')) {
    const restartButton = document.getElementById('restart');
    const poemLines = document.querySelectorAll('.poem-reading-content p');
    const poemContent = document.querySelector('.poem-reading-content')
    restartButton.addEventListener('click', (event) => {
      bar.animate(0);
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
      document.querySelector('.poem-reading-line').scrollIntoView({'behavior': 'smooth'})
    });
  }
}

const tapToRead = () => {
  const poemContent = document.querySelector('.poem-reading-content');
  if (poemContent) {
    poemContent.addEventListener('touchstart', (event) => {
      if (document.querySelector('.start-container.hidden')) {
        if (document.querySelector('.poem-reading-line-hidden')) {
          const shownLine = document.querySelector('.poem-reading-line');
          const hiddenLine = document.querySelector('.poem-reading-line-hidden');
          const readingProgression = document.querySelector('#lesson_reading_progression');
          shownLine.classList.remove('poem-reading-line');
          shownLine.classList.add('poem-reading-line-viewed');
          hiddenLine.classList.remove('poem-reading-line-hidden');
          hiddenLine.classList.add('poem-reading-line');
          shownLine.scrollIntoView({'behavior': 'smooth'});
          readingProgression.value = readingProgressBar()*100;
          bar.animate(readingProgressBar());
          if (readingProgression.value === '100') {
            setTimeout(successModal, 1500)
          }
        }
      }
    }, false);
  }
};

export { tapToRead, restartReading };
