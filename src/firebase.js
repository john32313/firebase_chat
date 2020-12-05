import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCoAjkH2PSR4NeyyUvtXOJkzBqu7dCd9vU',
  authDomain: 'wild-chat-35a17.firebaseapp.com',
  databaseURL: 'https://wild-chat-35a17-default-rtdb.firebaseio.com/',
  projectId: 'wild-chat-35a17',
  storageBucket: 'wild-chat-35a17.appspot.com',
  messagingSenderId: '347327653127',
  appId: '1:347327653127:web:97071d44086b2c074691a2',
};

firebase.initializeApp(firebaseConfig);
