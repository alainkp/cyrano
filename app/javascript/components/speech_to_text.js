import DiffMatchPatch from 'diff-match-patch';

const createPoemArray = () => {
  const poem = document.querySelector('.hidden-poem').innerText;
  const wordsPoem = poem.replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").split(' ');
  console.log(wordsPoem)
  return wordsPoem;
}

const speechToText = () => {
  // if (document.querySelector('.hidden-poem')) {
    const my_poem = createPoemArray();
    // const poem = document.querySelector('.hidden-poem').innerText;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    const noteTextarea = document.getElementById('note-textarea');
    let noteContent = '';
    recognition.continuous = true;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event) =>  {
      console.log(event);
      const current = event.resultIndex;
      let transcript = event.results[current][0].transcript.trim();
      noteContent += ' ' +transcript[0].toUpperCase() + transcript.substring(1) + '.';
      // const dmp = new DiffMatchPatch();
      // const diffs = dmp.diff_main(noteContent, poem);
      // const test = dmp.diff_prettyHtml(diffs);
      // const poemContentDiv = document.getElementById('poem-content')
      // poemContentDiv.insertAdjacentHTML('afterbegin', test)
      noteTextarea.innerText = noteContent;

    };

    // document.getElementById('start-record-btn').addEventListener('click', (e) => {
    //   if (noteContent.length) {
    //     noteContent += ' ';
    //   }
    //   recognition.start();
    // });

    // document.getElementById('pause-record-btn').addEventListener('click', (e) => {
    //   recognition.stop();
    // });

    document.getElementById('stop-record-btn').addEventListener('click', (e) => {
      recognition.stop();
      noteContent = '';
      noteTextarea.innerText = '';
    });

    initRecordButton(recognition);

    noteTextarea.addEventListener('input', () => {
      noteContent = noteTextarea.innerText;
    });
  // }
};

const initRecordButton = (recognition) => {
  const recordBtn = document.querySelector('.record-btn');
  const recordBtnLogo = document.querySelector('.record-btn-logo');

  if (recordBtn) {
    recordBtn.addEventListener('click',(e) => {
      const start = recordBtnLogo.classList.contains('fa-microphone-alt');
      if (start) {
        recordBtnLogo.classList.remove('fa-microphone-alt');
        recordBtnLogo.classList.add('fa-pause');
        recordBtn.classList.toggle('pause');
        recognition.start();
      } else {
        recordBtnLogo.classList.remove('fa-pause');
        recordBtnLogo.classList.add('fa-microphone-alt');
        recordBtn.classList.toggle('pause');
        recognition.stop();
      }
    });
  }
}

export { speechToText };












