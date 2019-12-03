import DiffMatchPatch from 'diff-match-patch';
import ProgressBar from "progressbar.js";
import { successModal } from '../components/success_modal.js'


// const linearGradient = `
// <defs>
//   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
//     <stop offset="0%" stop-color="#FFEBB7"/>
//     <stop offset="50%" stop-color="#FFEBB7"/>
//     <stop offset="100%" stop-color="#9DD8C8"/>
//   </linearGradient>
// </defs>`;

let currentLine = 0;

const initReciteProgressBar = () => {
  const reciteProgressBar = document.getElementById('recite-progress-bar');
  if (reciteProgressBar) {
     const bar = new ProgressBar.SemiCircle(reciteProgressBar, {
      strokeWidth: 9,
      color: '#FE4A49',
      trailColor: '#E5E5E5',
      trailWidth: 5,
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
        // if (value === 0) {
        //   bar.setText('');
        // } else {
          bar.setText(`${value}%`);
        // }
        bar.text.style.color = '#FE4A49';
      }
    });

    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '2rem';
    // bar.svg.insertAdjacentHTML('afterBegin', linearGradient);
    return bar
  }
}
const bar = initReciteProgressBar();
let current = 0;
const speechToText = () => {
  // if (document.querySelector('.hidden-poem')) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'fr-FR';
    recognition.onresult = (event) =>  {
      console.log(event);
      let overallProgression = 0;
      const poemLength = document.querySelectorAll('.line').length - 1;
      // const current = event.resultIndex;
      const currentReciteLineClass = '.recite-line-' + (current + 1).toString();
      const currentContentLineClass = '.content-line-' + (current + 1).toString();
      const reciteProgression = document.querySelector('#recite_progression');
      // console.log(currentContentLineClass);
      const reciteContainer = document.querySelector(currentReciteLineClass);
      const contentContainer = document.querySelector(currentContentLineClass);
      // console.log(reciteContainer);
      let transcript = event.results[0][0].transcript.trim().toLowerCase();
      // let mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
      const textModel = contentContainer.innerText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").trim();
      // if (!mobileRepeatBug) {
        const dmp = new DiffMatchPatch();
        // console.log(transcript);
        // console.log(textModel);
        const diffs = dmp.diff_main(transcript,textModel);
        // console.log(diffs);
        dmp.diff_cleanupSemantic(diffs)
        const diff_html = dmp.diff_prettyHtml(diffs);
        const regex = /<ins style="background:#e6ffe6;"> *((&nbsp;)*) *((&nbsp;)*)<\/ins>/gi;

        reciteContainer.innerHTML = diff_html.replace(regex, ' ');
        // contentContainer.parentNode.classList.toggle('hidden');
        currentLine = current;
        reciteContainer.scrollIntoView({'behavior': 'smooth'});
        // console.log(poemLength);
        // console.log(currentLine);
        let reciteProgress = ((currentLine + 1) * 100 / poemLength);
        // console.log(reciteProgress);
        overallProgression += Number.parseInt(reciteProgress,10);
        reciteProgression.value = overallProgression;
        bar.animate(overallProgression/100);
        if (reciteProgression.value === '100') {
          setTimeout(successModal, 1500)
        }

      // }
      // reciteContainer.innerText = transcript;

    };

    // recognition.onspeechend = (event) => {
    //   console.log('arrêt de la parole')
    // };

    recognition.onend = () => {
      recognition.start();
      current += 1;
    };
    // document.getElementById('start-record-btn').addEventListener('click', (e) => {
    //   if (noteContent.length) {
    //     noteContent += ' ';
    //   }
    //   recognition.start();
    // });

    // document.getElementById('pause-record-btn').addEventListener('click', (e) => {
    //   recognition.stop();
    // });

    // document.getElementById('stop-record-btn').addEventListener('click', (e) => {
    //   recognition.stop();
    //   noteContent = '';
    //   noteTextarea.innerText = '';
    // });

    initRecordButton(recognition);
};

const initRecordButton = (recognition) => {
  const recordBtn = document.querySelector('.record-btn');
  const recordBtnLogo = document.querySelector('.record-btn-logo');

  if (recordBtn) {
    recordBtn.addEventListener('click',(e) => {
      const start = recordBtnLogo.classList.contains('fa-microphone-alt');
      if (start) {
        recordBtnLogo.classList.remove('fa-microphone-alt');
        recordBtnLogo.classList.add('fa-pause');
        recordBtn.classList.toggle('pause');
        recognition.start();
      } else {
        recordBtnLogo.classList.remove('fa-pause');
        recordBtnLogo.classList.add('fa-microphone-alt');
        recordBtn.classList.toggle('pause');
        recognition.stop();
      }
    });
  }
}

export { speechToText };
