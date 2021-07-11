import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyybelhhZqlNeVNQBdTB-ijRHLawaXVio",
  authDomain: "homegrown-learning.firebaseapp.com",
  projectId: "homegrown-learning",
  storageBucket: "homegrown-learning.appspot.com",
  messagingSenderId: "920114469568",
  appId: "1:920114469568:web:54c44070725441bc2eeb25",
  measurementId: "G-C4NSWG23E7"
};

export const database = firebase.firestore();

firebase.initializeApp(firebaseConfig);

export default firebase;