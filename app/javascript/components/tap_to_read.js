import ProgressBar from "progressbar.js";
const linearGradient = `
<defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#00b09b"/>
    <stop offset="50%" stop-color="#60BD70"/>
    <stop offset="100%" stop-color="#96c93d"/>
  </linearGradient>
</defs>`;
const initReadingProgressBar = () => {
  // let bar = {}
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
      // from: {color: '#26DBF2'},
      // to: {color: '#1EDD88'},
      // Set default step function for all animate calls
      step: (state, bar) => {
        // bar.path.setAttribute('stroke', state.color);
        const value = Math.round(bar.value() * 100);
        if (value === 0) {
          bar.setText('');
        } else {
          bar.setText(`${value}%`);
        }
        bar.text.style.color = '#57D296';
      }
    });

    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.svg.insertAdjacentHTML('afterBegin', linearGradient);
    // Number from 0.0 to 1.0
    return bar
  }
}

// const audioSetTimecode = () => {

//   const audio = document.getElementById('listening-audio');
//   const readingProgressBar = document.getElementById('reading-progress-bar');
//   const bar = initReadingProgressBar();
//   if (audio) {
//     console.log('toto');
//     const input_audio_progr = document.getElementById('lesson_listening_progression');
//     const p = document.querySelector('.progress-bar');
//     audio.currentTime = audio.duration * input_audio_progr.value / 100;
//     p.style.width = input_audio_progr.value;
//     audio.addEventListener('timeupdate',() => {
//       input_audio_progr.value = Math.ceil(audio.currentTime / audio.duration * 100);
//       // console.log(input_audio_progr.value);
//       p.style.width = `${input_audio_progr.value}%`
//       bar.animate(input_audio_progr.value/100);
//     });
//   }
// }

const readingProgressBar = () => {
  // const readingProgressBar = document.getElementById('reading-progress-bar');
  const bar = initReadingProgressBar();
  const p = document.querySelector('.reading-progress-bar')
  if (p) {
    let overallProgression = 0;
    const poemOverallLength = document.querySelectorAll('.poem-reading-content p').length;
    console.log(poemOverallLength)
    let unreadLinesLength = document.querySelectorAll('.poem-reading-line-hidden').length;
    console.log(unreadLinesLength)
    let progression = 100 - (unreadLinesLength * 100 / poemOverallLength);
    console.log(progression)
    overallProgression += Number.parseInt(progression,10);
    console.log(overallProgression)
    p.style.width = `${overallProgression}%`;
    bar.animate(overallProgression/100);
  }
}

const tapToRead = () => {
  let scrolling = 0;
  readingProgressBar();
  const poemContent = document.querySelector('.poem-reading-content');
  document.addEventListener('touchstart', (event) => {
    if (document.querySelector('.start-container.hidden')) {
      if (document.querySelector('.poem-reading-line-hidden')) {
        const shownLine = document.querySelector('.poem-reading-line');
        const hiddenLine = document.querySelector('.poem-reading-line-hidden');
        let elementHeight = document.querySelector('.poem-reading-line').offsetHeight - 20;
        shownLine.classList.remove('poem-reading-line');
        shownLine.classList.add('poem-reading-line-viewed');
        hiddenLine.classList.remove('poem-reading-line-hidden');
        hiddenLine.classList.add('poem-reading-line');
        scrolling += elementHeight;
        poemContent.scroll(0, scrolling);
      }
    }
  }, false);
};

export { tapToRead };
