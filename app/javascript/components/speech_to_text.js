import DiffMatchPatch from 'diff-match-patch';
import ProgressBar from "progressbar.js";
import { successModal } from '../components/success_modal.js'

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
      step: (state, bar) => {
        const value = Math.round(bar.value() * 100);
        bar.setText(`${value}%`);
        bar.text.style.color = '#FE4A49';
      }
    });
    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '2rem';
    return bar
  }
}

const bar = initReciteProgressBar();
let current = 0;

const speechToText = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'fr-FR';
  recognition.onresult = (event) =>  {
    console.log(event);
    let overallProgression = 0;
    const poemLength = document.querySelectorAll('.line').length;
    // const current = event.resultIndex;
    const currentReciteLineClass = '.recite-line-' + (current + 1).toString();
    const currentContentLineClass = '.content-line-' + (current + 1).toString();
    const reciteProgression = document.querySelector('#recite_progression');
    // console.log(currentContentLineClass);
    const reciteContainer = document.querySelector(currentReciteLineClass);
    const contentContainer = document.querySelector(currentContentLineClass);
    // console.log(reciteContainer);
    let transcript = event.results[0][0].transcript.trim().toLowerCase();
    const textModel = contentContainer.innerText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").trim();
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
      recognition.stop();
      const recordBtn = document.querySelector('.record-btn');
      const recordBtnLogo = document.querySelector('.record-btn-logo');
      recordBtnLogo.classList.remove('fa-pause');
      recordBtnLogo.classList.add('fa-microphone-alt');
      recordBtn.classList.toggle('pause');
      recognition.continuous = false;
      setTimeout(successModal, 1500);
    }
  };

  recognition.onend = () => {
    recognition.start();
    current += 1;
  };

  initRecordButton(recognition);
};

const speechToTextDesktop = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'fr-FR';
  recognition.onresult = (event) =>  {
    console.log(event);
    let overallProgression = 0;
    const poemLength = document.querySelectorAll('.line').length;
    current = event.resultIndex;
    const currentReciteLineClass = '.recite-line-' + (current + 1).toString();
    const currentContentLineClass = '.content-line-' + (current + 1).toString();
    const reciteProgression = document.querySelector('#recite_progression');
    // console.log(currentContentLineClass);
    const reciteContainer = document.querySelector(currentReciteLineClass);
    const contentContainer = document.querySelector(currentContentLineClass);
    // console.log(reciteContainer);
    let transcript = event.results[current][0].transcript.trim().toLowerCase();
    const textModel = contentContainer.innerText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").trim();
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
      recognition.stop();
      const recordBtn = document.querySelector('.record-btn');
      const recordBtnLogo = document.querySelector('.record-btn-logo');
      recordBtnLogo.classList.remove('fa-pause');
      recordBtnLogo.classList.add('fa-microphone-alt');
      recordBtn.classList.toggle('pause');
      recognition.continuous = false;
      setTimeout(successModal, 1500);
    }
  };

  // recognition.onend = () => {
    // recognition.start();
    // current += 1;
  // };

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

export { speechToText, speechToTextDesktop };
