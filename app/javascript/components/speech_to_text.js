import DiffMatchPatch from 'diff-match-patch';

let currentLine = 0;

const createPoemArray = () => {
  const poem = document.querySelector('.hidden-poem').innerText;
  const wordsPoem = poem.replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ").split(' ');
  console.log(wordsPoem)
  return wordsPoem;
}

const speechToText = () => {
  // if (document.querySelector('.hidden-poem')) {
    // const my_poem = createPoemArray();
    // const poem = document.querySelector('.hidden-poem').innerText;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'fr-FR';
    // const noteTextarea = document.getElementById('note-textarea');
    // let noteContent = '';

    recognition.onresult = (event) =>  {
      console.log(event);
      const current = event.resultIndex;
      const currentReciteLineClass = '.recite-line-' + (current + 1).toString();
      const currentContentLineClass = '.content-line-' + (current + 1).toString();
      // console.log(currentContentLineClass);
      // console.log('toto');
      const reciteContainer = document.querySelector(currentReciteLineClass);
      const contentContainer = document.querySelector(currentContentLineClass);
      // console.log('titi');
      // console.log(reciteContainer);
      let transcript = event.results[current][0].transcript.trim();
      // noteContent += ' ' +transcript[0].toUpperCase() + transcript.substring(1) + '.';
      // reciteContainer.innerText = transcript;
      const dmp = new DiffMatchPatch();
      const textModel = contentContainer.innerText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}="»\-_`~()|\n]/g," ");
      console.log(transcript);
      console.log(textModel);
      const diffs = dmp.diff_main(transcript,textModel);
      console.log(diffs);
      dmp.diff_cleanupSemantic(diffs)
      const diff_html = dmp.diff_prettyHtml(diffs);
      console.log(diff_html);
      reciteContainer.innerHTML = diff_html;
      // const poemContentDiv = document.getElementById('poem-content')
      // poemContentDiv.insertAdjacentHTML('afterbegin', test)
      // noteTextarea.innerText = noteContent;
      // contentContainer.parentNode.classList.toggle('hidden');
      currentLine = current;
      reciteContainer.scrollIntoView({'behavior': 'smooth'});
      console.log(currentLine);
    };

    recognition.onspeechend = (event) => {
      console.log('arrêt de la parole')
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

    // document.getElementById('stop-record-btn').addEventListener('click', (e) => {
    //   recognition.stop();
    //   noteContent = '';
    //   noteTextarea.innerText = '';
    // });

    initRecordButton(recognition);

    // noteTextarea.addEventListener('input', () => {
    //   noteContent = noteTextarea.innerText;
    // });
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












