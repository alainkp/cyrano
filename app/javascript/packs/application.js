import "bootstrap";
import ProgressBar from "progressbar.js";
import { speechToText,initRecordButton } from "../components/speech_to_text.js";
import { initAudio } from "../components/audio_timecode.js";
import { startReading } from "../components/start_reading.js";
import { tapToRead, restartReading } from "../components/tap_to_read.js";
// import { restartReading } from "../components/restart_reading.js";
import { lessonProgressBar, lessonShowProgression, lessonOverallProgress } from "../components/lessonProgressBar";
import { initPlyr } from "../components/init_plyr";
// import { loadDynamicDashboardText } from '../components/banner';

initAudio();

if (document.querySelector("#lessons-card")) {
  lessonProgressBar();
}

if (document.querySelector(".lesson-overall-progress-bar")) {
  lessonOverallProgress();
}
if (document.querySelector(".lesson-show-progression")) {
  lessonShowProgression();
}

if (document.getElementById('note-textarea')) {
  speechToText();
  // initRecordButton();
}

if (document.getElementById('start')) {
  startReading();
}

tapToRead();
restartReading();
