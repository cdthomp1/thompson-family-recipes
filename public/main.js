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

var auth = firebase.auth();


auth.onAuthStateChanged((firebaseUser) => {
    //checks if the user is already logged in to the system
console.log("AUTHED")
});

