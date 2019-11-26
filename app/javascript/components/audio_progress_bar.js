import ProgressBar from "progressbar.js";

const initAudioProgress = () => {
  const audioProgressBar = document.getElementById('audio-progress-bar');
  if (audioProgressBar) {
    const bar = new ProgressBar.SemiCircle(audioProgressBar, {
      strokeWidth: 6,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 3000,
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
        const value = Math.round(bar.value() * 100);
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
  bar.animate(1.0);  // Number from 0.0 to 1.0

  }
}

export{ initAudioProgress }
