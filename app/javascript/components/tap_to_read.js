import ProgressBar from "progressbar.js";

const linearGradient = `
<defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#FFEBB7"/>
    <stop offset="50%" stop-color="#FFEBB7"/>
    <stop offset="100%" stop-color="#9DD8C8"/>
  </linearGradient>
</defs>`;

const initReadingProgressBar = () => {
  const readingProgressBar = document.getElementById('reading-progress-bar');
  if (readingProgressBar) {
     const bar = new ProgressBar.SemiCircle(readingProgressBar, {
      strokeWidth: 6,
      color: 'url(#gradient)',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 500,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      // from: {color: '#9DD8C8'},
      // to: {color: '#FFEBB7'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        const value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }
        bar.text.style.color = '#9DD8C8';
      }
    });

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.svg.insertAdjacentHTML('afterBegin', linearGradient);
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
        }
      }
    }, false);
  }
};

export { tapToRead, restartReading };
