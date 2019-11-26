const audiSetTimecode = () => {
  const audio = document.getElementById('listening-audio');
  if (audio) {
    const input_audio_progr = document.getElementById('lesson_listening_progression');
    const p = document.querySelector('.progress-bar');
    console.log(audio.duration);
    console.log(input_audio_progr.value);
    console.log(audio.duration * input_audio_progr.value / 100);
    audio.currentTime = audio.duration * input_audio_progr.value / 100;
    p.style.width = input_audio_progr.value;
    audio.addEventListener('timeupdate',() => {
      input_audio_progr.value = Math.ceil(audio.currentTime / audio.duration * 100);
      // console.log(input_audio_progr.value);
      p.style.width = `${input_audio_progr.value}%`
    });
  }
}

const initAudio = () => {
  const audio = document.getElementById('listening-audio');
  if (audio) {
    audio.addEventListener('loadedmetadata', audiSetTimecode)
  }
}

export { initAudio }
