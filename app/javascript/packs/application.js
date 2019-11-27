import "bootstrap";
import ProgressBar from "progressbar.js";
import { speechToText } from "../components/speech_to_text.js";
import { initAudio } from "../components/audio_timecode.js";
import { lessonProgressBar, lessonShowProgression, lessonOverallProgress } from "../components/lessonProgressBar";
import { loadDynamicDashboardText } from '../components/banner';

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
}

// loadDynamicDashboardText();
