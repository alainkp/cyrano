import "bootstrap";
import {init_audio_timecode } from "../components/audio_timecode.js";
import { speechToText } from "../components/speech_to_text.js";
import { createPoemArray } from "../components/poem_to_array.js";

init_audio_timecode();
speechToText();
createPoemArray();

