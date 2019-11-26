import "bootstrap";
import ProgressBar from "progressbar.js";
import { speechToText } from "../components/speech_to_text.js";
import { initAudio } from "../components/audio_timecode.js";
import { lessonProgressBar, lessonShowProgression } from "../components/lessonProgressBar";

speechToText();
initAudio();

if (document.querySelector("#lessons-card")) {
  lessonProgressBar();
}
if (document.querySelector(".lesson-show-progression")) {
  lessonShowProgression();
}
