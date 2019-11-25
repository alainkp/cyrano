const init_audio_timecode = () => {
  const audio = document.getElementById('listening-audio');
  if (audio) {
    const input_audio_progr = document.getElementById('lesson_listening_progression');
    audio.addEventListener('timeupdate',() => {
      input_audio_progr.value = Math.floor(audio.currentTime / audio.duration * 100);
    });
  }
}

export { init_audio_timecode }
