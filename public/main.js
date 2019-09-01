/**********************************************
 * MAIN.JS | Quality Assurance Javascript File 
 * 
 *********************************************/
'use strict';
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDW0cOSK0scpvqGQYbUcDm9b3dgB50iISM",
    authDomain: "thompson-recipes-246300.firebaseapp.com",
    databaseURL: "https://thompson-recipes-246300.firebaseio.com",
    projectId: "thompson-recipes-246300",
    storageBucket: "",
    messagingSenderId: "556667094869",
    appId: "1:556667094869:web:1837fc0766c6286a"
  };
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});