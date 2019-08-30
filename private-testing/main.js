/**********************************************
 * MAIN.JS | Quality Assurance Javascript File 
 * 
 *********************************************/
'use strict';
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
// Initialize Firebase
/* var firebaseConfig = {
    apiKey: "AIzaSyDW0cOSK0scpvqGQYbUcDm9b3dgB50iISM",
    authDomain: "thompson-recipes-246300.firebaseapp.com",
    databaseURL: "https://thompson-recipes-246300.firebaseio.com",
    projectId: "thompson-recipes-246300",
    storageBucket: "",
    messagingSenderId: "556667094869",
    appId: "1:556667094869:web:1837fc0766c6286a"
  };
firebase.initializeApp(firebaseConfig); */
// Initialize Cloud Firestore through Firebase

firebase.initializeApp({
  apiKey: "AIzaSyDW0cOSK0scpvqGQYbUcDm9b3dgB50iISM",
  authDomain: "thompson-recipes-246300.firebaseapp.com",
  projectId:"thompson-recipes-246300"
});

var db = firebase.firestore();

db.collection("test").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  });
});