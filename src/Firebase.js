import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBQWcIniEQ3UZMqKB5q6ETnimcqoO4Y_0g",
    authDomain: "instagram-clone-9c3fa.firebaseapp.com",
    databaseURL: "https://instagram-clone-9c3fa-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-9c3fa",
    storageBucket: "instagram-clone-9c3fa.appspot.com",
    messagingSenderId: "123602268749",
    appId: "1:123602268749:web:9944b1a78ae88fa5a52204",
    measurementId: "G-1420X12V86"
  });

  const db=firebaseApp.firestore();
  const auth =firebaseApp.auth();
  const storage =  firebaseApp.storage();

export  {db,auth,storage};