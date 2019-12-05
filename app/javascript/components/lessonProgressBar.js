import ProgressBar from "progressbar.js";
let linearGradientCircle = `
<defs>
  <linearGradient id="gradientCircle" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#FDB76C"/>
    <stop offset="100%" stop-color="#FB8180"/>
  </linearGradient>
</defs>`;

const lessonProgressBar = () => {
  const lessonProgressBar = document.querySelectorAll('.reading-progression');
  lessonProgressBar.forEach((card) => {
    const readingProgress = card.dataset.readingProgress;
    const bar = new ProgressBar.Circle(card, {
      strokeWidth: 9,
      color: 'url(#gradientCircle)',
      trailColor: '#E5E5E5',
      trailWidth: 5,
      easing: 'easeInOut',
      duration: 3000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      step: (state, bar) => {
        const value = readingProgress;
        bar.setText(`${value}%`);
        bar.text.style.color = '#FC8D5B';
      }
    });

    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '1rem';
    bar.svg.insertAdjacentHTML('afterBegin', linearGradientCircle);
    bar.animate(Number.parseInt(readingProgress,10)/100);  // Number from 0.0 to 1.0
  })
}

const lessonShowProgression = () => {
  const progressCircles = document.querySelectorAll('.lesson-show-progression')
  progressCircles.forEach((progressCircle)=>{
    const progress = progressCircle.dataset.progression;
    const colorFirst = progressCircle.dataset.colorFirst;
    const colorLast = progressCircle.dataset.colorLast;
    const bar = new ProgressBar.Circle(progressCircle, {
      strokeWidth: 9,
      color: `${colorFirst}`,
      trailColor: '#E5E5E5',
      trailWidth: 5,
      easing: 'easeInOut',
      duration: 3000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      step: (state, bar) => {
        const value = progress;
        if (value === '100') {
          bar.setText('Terminé');
        } else {
          bar.setText(`${value}%`);
        }

        bar.text.style.color = colorFirst;
      }
    });
    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '18px';
    bar.animate(Number.parseInt(progress,10)/100);  // Number from 0.0 to 1.0
  });
}

const lessonOverallProgress = () => {
  const p1 = document.querySelector('.lesson-overall-progress-bar1')
  const p2 = document.querySelector('.lesson-overall-progress-bar2')
  if (p1 && p2) {
    const progressCircles = document.querySelectorAll('.lesson-show-progression')
    let overallProgression = 0;
    progressCircles.forEach((progressCircle)=>{
      overallProgression += Number.parseInt(progressCircle.dataset.progression,10);
    });
    overallProgression /= 3
    if (overallProgression > 50 ) {
      p1.style.width = `100%`;
      p2.style.width = `${(overallProgression-50)*2}%`;
    } else {
      p1.style.width = `${overallProgression*2}%`;
    }

  }
}



export{ lessonProgressBar, lessonShowProgression, lessonOverallProgress }

