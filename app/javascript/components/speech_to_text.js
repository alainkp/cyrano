const createPoemArray = () => {
  const poem = document.querySelector('.hidden-poem').innerText;
  const wordsPoem = poem.replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").split(' ');
  console.log(wordsPoem)
  return wordsPoem;
}

if (document.querySelector('.hidden-poem')) {
  const poem = createPoemArray();
}


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
  });
};

export { speechToText };

