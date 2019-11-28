const readingProgressBar = () => {
  const p = document.querySelector('.reading-overall-progress-bar')
  if (p) {
    let overallProgression = 0;
    const poemOverallLength = document.querySelectorAll('.poem-reading-content p').length;
    let unreadLinesLength = document.querySelector('.poem-reading-line-hidden').length;
    let progression = (unreadLinesLength * 100 / poemOverallLength);
    console.log(progression);
    overallProgression += Number.parseInt(progression,10);
    p.style.width = `${overallProgression}%`;
  }

  // const progressCircle =
  const bar = new ProgressBar.Circle(overallProgression, {
    strokeWidth: 4,
    color: 'url(#gradientCircle)',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 3000,
    svgStyle: null,
    text: {
      value: '',
      alignToBottom: false
    },
    step: (state, bar) => {
      const progress = overallProgression;
      const value = progress;
      if (value === 0) {
        bar.setText('');
      } else {
        bar.setText(`${value}%`);
      }

      bar.text.style.color = '#60BD70';
    }
  });
  bar.svg.insertAdjacentHTML('afterBegin', linearGradientCircle);
  bar.animate(Number.parseInt(progress,10)/100);
}
