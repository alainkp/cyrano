import ProgressBar from "progressbar.js";

const lessonProgressBar = () => {
  const lessonProgressBar = document.querySelectorAll('.reading-progression');
  lessonProgressBar.forEach((card) => {
    const readingProgress = card.dataset.readingProgress;
    const bar = new ProgressBar.Circle(card, {
      strokeWidth: 6,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      from: {color: '#ED6A5A'},
      to: {color: '#1EDD88}'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        const value = readingProgress;
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }

        bar.text.style.color = state.color;
      }
    });

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.animate(Number.parseInt(readingProgress,10)/100);  // Number from 0.0 to 1.0

  })
}

const lessonShowProgression = () => {
  const progressCircles = document.querySelectorAll('.lesson-show-progression')
  progressCircles.forEach((progressCircle)=>{
    const progress = progressCircle.dataset.progression;
    const bar = new ProgressBar.Circle(progressCircle, {
      strokeWidth: 6,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1000,
      svgStyle: null,
      text: {
        value: '',
        alignToBottom: false
      },
      from: {color: '#ED6A5A'},
      to: {color: '#1EDD88}'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        const value = progress;
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }

        bar.text.style.color = state.color;
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.animate(Number.parseInt(progress,10)/100);  // Number from 0.0 to 1.0
  });
}



export{ lessonProgressBar, lessonShowProgression }

