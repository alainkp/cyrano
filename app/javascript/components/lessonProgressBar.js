import ProgressBar from "progressbar.js";
const linearGradientCircle = `
<defs>
  <linearGradient id="gradientCircle" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#9DD8C8"/>
    <stop offset="90%" stop-color="#FFEBB7"/>
    <stop offset="100%" stop-color="#FFEBB7"/>
  </linearGradient>
</defs>`;

const lessonProgressBar = () => {
  const lessonProgressBar = document.querySelectorAll('.reading-progression');
  lessonProgressBar.forEach((card) => {
    const readingProgress = card.dataset.readingProgress;
    console.log(readingProgress);
    const bar = new ProgressBar.Circle(card, {
      strokeWidth: 6,
      color: 'url(#gradientCircle)',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 3000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      // from: {color: '#ED6A5A'},
      // to: {color: '#1EDD88}'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        // bar.path.setAttribute('stroke', state.color);
        const value = readingProgress;
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }

        bar.text.style.color = '#9DD8C8';
      }
    });

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '1rem';
    // console.log(Number.parseInt(readingProgress,10)/100);
    bar.svg.insertAdjacentHTML('afterBegin', linearGradientCircle);
    bar.animate(Number.parseInt(readingProgress,10)/100);  // Number from 0.0 to 1.0
  })
}

const lessonShowProgression = () => {
  const progressCircles = document.querySelectorAll('.lesson-show-progression')
  progressCircles.forEach((progressCircle)=>{
    const progress = progressCircle.dataset.progression;
    const bar = new ProgressBar.Circle(progressCircle, {
      strokeWidth: 4,
      color: 'url(#gradientCircle)',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 3000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      // from: {color: '#ED6A5A'},
      // to: {color: '#1EDD88}'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        // bar.path.setAttribute('stroke', state.color);
        const value = progress;
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }

        bar.text.style.color = '#9DD8C8';
      }
    });
    // bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    // bar.text.style.fontSize = '1Opx';
    bar.svg.insertAdjacentHTML('afterBegin', linearGradientCircle);
    bar.animate(Number.parseInt(progress,10)/100);  // Number from 0.0 to 1.0
  });
}

const lessonOverallProgress = () => {
  const p = document.querySelector('.lesson-overall-progress-bar')
  if (p) {
    const progressCircles = document.querySelectorAll('.lesson-show-progression')
    let overallProgression = 0;
    progressCircles.forEach((progressCircle)=>{
      overallProgression += Number.parseInt(progressCircle.dataset.progression,10);
    });
    p.style.width = `${overallProgression/3}%`;
  }
}



export{ lessonProgressBar, lessonShowProgression, lessonOverallProgress }

