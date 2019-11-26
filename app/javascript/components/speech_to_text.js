import $ from 'jquery';

const speechToText = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0';
  const noteTextarea = $('#note-textarea');
  const instructions = $('#recording-instructions');
  let noteContent = '';

  speechRecognitionList.addFromString(grammar, 1);

  recognition.continuous = true;

  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = 'fr';
  // recognition.interimResults = false;
  // recognition.maxAlternatives = 1;

  // This block is called every time the Speech APi captures a line.
  recognition.onresult = (event) =>  {

    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far.
    // We only need the current one.
    console.log(event)
    const current = event.resultIndex;

    // Get a transcript of what was said.
    const transcript = event.results[current][0].transcript;
    console.log(transcript)

    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    const mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

    if(!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
    }
  };

  recognition.onstart = () => {
    instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }

  recognition.onspeechend = () => {
    instructions.text('You were quiet for a while so voice recognition turned itself off.');
  }

  recognition.onerror = (event) => {
    if(event.error == 'no-speech') {
      instructions.text('No speech was detected. Try again.');
    };
  }

  // function readOutLoud(message) {
  //   var speech = new SpeechSynthesisUtterance();

  //   // Set the text and voice attributes.
  //   speech.text = message;
  //   speech.volume = 1;
  //   speech.rate = 1;
  //   speech.pitch = 1;

  //   window.speechSynthesis.speak(speech);
  // }



  /*-----------------------------
        App buttons and input
  ------------------------------*/

  $('#start-record-btn').on('click', (e) => {
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });


  $('#pause-record-btn').on('click', (e) => {
    recognition.stop();
    instructions.text('Voice recognition paused.');
  });

  $('#stop-record-btn').on('click', (e) => {
    recognition.stop();
    noteContent = '';
    noteTextarea.val('');
  });

  // Sync the text inside the text area with the noteContent variable.
  noteTextarea.on('input', () => {
    noteContent = $(this).val();
  })
};

export { speechToText };

