import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAMAEejcv9ow1LdHnPyLRbMEBsdqnKSVnI',
  authDomain: 'chat-98085.firebaseapp.com',
  databaseURL: 'https://chat-98085.firebaseio.com',
  projectId: 'chat-98085',
  storageBucket: 'chat-98085.appspot.com',
  messagingSenderId: '665103014622',
  appId: '1:665103014622:web:6c702cb06d28c7b5a0804f',
};

firebase.initializeApp(firebaseConfig);
