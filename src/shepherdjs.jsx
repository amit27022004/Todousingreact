import Shepherd from 'shepherd.js';
import './shepherd.css';

const tour = new Shepherd.Tour({
  useModalOverlay: false,
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true,
  },
});

export default tour;