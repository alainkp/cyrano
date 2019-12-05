import ProgressBar from "progressbar.js";
import { successModal } from '../components/success_modal.js'

const linearGradient = `
<defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#FFEBB7"/>
    <stop offset="5%" stop-color="#FFEBB7"/>
    <stop offset="100%" stop-color="#9DD8C8"/>
  </linearGradient>
</defs>`;
const initAudioProgressBar = () => {
  const audioProgressBar = document.getElementById('audio-progress-bar');
  if (audioProgressBar) {
     const bar = new ProgressBar.SemiCircle(audioProgressBar, {
      strokeWidth: 9,
      color: 'rgba(255, 211, 52, 1)',
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
        bar.text.style.color = 'rgba(255, 211, 52, 1)';
      }
    });

    bar.text.style.fontFamily = '"museo-sans-rounded", sans-serif';
    bar.text.style.fontSize = '2rem';
    bar.svg.insertAdjacentHTML('afterBegin', linearGradient);
    return bar
  }
}

const audioSetTimecode = () => {
  const audio = document.getElementById('listening-audio');
  const audioProgressBar = document.getElementById('audio-progress-bar');
  const bar = initAudioProgressBar();
  if (audio) {
    const input_audio_progr = document.getElementById('lesson_listening_progression');
    audio.currentTime = audio.duration * input_audio_progr.value / 100;
    audio.addEventListener('timeupdate',() => {
      input_audio_progr.value = Math.ceil(audio.currentTime / audio.duration * 100);
      bar.animate(input_audio_progr.value/100);
      if (input_audio_progr.value === '100') {
        setTimeout(successModal, 1500)
      }
    });
  }
}

const initAudio = () => {
  const audio = document.getElementById('listening-audio');
  if (audio) {
      audioSetTimecode();
  }
}

export { initAudio }
