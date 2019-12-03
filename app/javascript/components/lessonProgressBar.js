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
    // console.log(readingProgress);
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
      // from: {color: '#ED6A5A'},
      // to: {color: '#1EDD88}'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        // bar.path.setAttribute('stroke', state.color);
        const value = readingProgress;
        // if (value === 0) {
        //   bar.setText('');
        // } else {
          bar.setText(`${value}%`);
        // }

        bar.text.style.color = '#9DD8C8';
      }
    });

    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
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
    const colorFirst = progressCircle.dataset.colorFirst;
    const colorLast = progressCircle.dataset.colorLast;
    // let linearGradientCircle = `
    //     <defs>
    //       <linearGradient id="gradientCircle${colorFirst}" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    //         <stop offset="0%" stop-color="${colorFirst}"/>
    //         <stop offset="100%" stop-color="${colorLast}"/>
    //       </linearGradient>
    //     </defs>`;
    //     console.log(linearGradientCircle);
    const bar = new ProgressBar.Circle(progressCircle, {
      strokeWidth: 9,
      color: `${colorFirst}`,
      // color: `url(#gradientCircle${colorFirst})`,
      trailColor: '#E5E5E5',
      trailWidth: 5,
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
        // if (value === 0) {
        //   bar.setText('');
        // } else {
          bar.setText(`${value}%`);
        // }

        bar.text.style.color = colorFirst;
      }
    });
    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '20px';
    // bar.svg.insertAdjacentHTML('afterBegin', linearGradientCircle);
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

