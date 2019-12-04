import "bootstrap";
import ProgressBar from "progressbar.js";
import { speechToText,initRecordButton, speechToTextDesktop } from "../components/speech_to_text.js";
import { initAudio } from "../components/audio_timecode.js";
import { startReading } from "../components/start_reading.js";
import { tapToRead, restartReading } from "../components/tap_to_read.js";
import { lessonProgressBar, lessonShowProgression, lessonOverallProgress } from "../components/lessonProgressBar";
import { initPlyr } from "../components/init_plyr";

setTimeout(()=>{
  initAudio();
},1000);

if (document.querySelector("#lessons-card")) {
  lessonProgressBar();
}

if (document.querySelector(".lesson-overall-progress-bar1")) {
  lessonOverallProgress();
}
if (document.querySelector(".lesson-show-progression")) {
  lessonShowProgression();
}

if (document.getElementById('note-textarea')) {
  if (!navigator.userAgent.includes('Mobile')) {
    speechToTextDesktop();
  } else {
    speechToText();
  }
}

if (document.getElementById('start')) {
  startReading();
}

tapToRead();
restartReading();
