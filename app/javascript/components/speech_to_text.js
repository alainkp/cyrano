const speechToText = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const noteTextarea = document.getElementById('note-textarea');
  let noteContent = '';
  recognition.continuous = true;
  recognition.lang = 'fr-FR';

  recognition.onresult = (event) =>  {
    const current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    noteContent += transcript;
    let wordsArray = noteContent.split(' ');
    console.log(wordsArray);
    noteTextarea.innerText = noteContent;
  };

  document.getElementById('start-record-btn').addEventListener('click', (e) => {
    if (noteContent.length) {
      noteContent += ' ';
    }
    recognition.start();
  });

  document.getElementById('pause-record-btn').addEventListener('click', (e) => {
    recognition.stop();
  });

  document.getElementById('stop-record-btn').addEventListener('click', (e) => {
    recognition.stop();
    noteContent = '';
    noteTextarea.innerText = '';
  });

  noteTextarea.addEventListener('input', () => {
    noteContent = noteTextarea.innerText;
  })
};

export { speechToText };

