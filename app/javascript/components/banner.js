// app/javascript/components/banner.js
import Typed from 'typed.js';

const loadDynamicDashboardText = () => {
  new Typed('#dashboard-typed-text', {
    strings: ["De retour pour apprendre", "Développe tes capacités d'apprentissages"],
    typeSpeed: 50,
    loop: true
  });
}

export { loadDynamicDashboardText };
