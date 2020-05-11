import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA5LLKStQy99Ze-f-_w4NdCMzoKTm11-N0',
  authDomain: 'fish-of-the-day-cipriano.firebaseapp.com',
  databaseURL: 'https://fish-of-the-day-cipriano.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// named import
export { firebaseApp };

// default import
export default base;
