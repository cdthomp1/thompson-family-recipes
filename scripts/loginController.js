var firebaseConfig = {
    apiKey: "AIzaSyDW0cOSK0scpvqGQYbUcDm9b3dgB50iISM",
    authDomain: "thompson-recipes-246300.firebaseapp.com",
    databaseURL: "https://thompson-recipes-246300.firebaseio.com",
    projectId: "thompson-recipes-246300",
    storageBucket: "thompson-recipes-246300.appspot.com",
    messagingSenderId: "556667094869",
    appId: "1:556667094869:web:1837fc0766c6286a"
};
firebase.initializeApp(firebaseConfig);

const loginBtn = document.getElementById("btnlogin");

var database = firebase.database();
var db = firebase.firestore();


function createUser() {
    var email = document.getElementById('Semail').value;
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var displayname = fname + " " + lname;
    console.log(email)
    var password = document.getElementById('Spassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayname
        }).then(function () {
            // Update successful.
            console.log("NAME")
        })
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(`THERE WAS A ${errorCode} with a message of ${errorMessage}`)
        // ...
    });
}

function apple() {

    document.getElementById('masterLogIn').style.display = "none";
    document.getElementById('user').style.display = "block";
    //var adds = document.getElementsByClassName('add');
    document.getElementById('username').innerHTML = " " + username;
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";

    /*  for (var i = 0; i < adds.length; i++) {
         adds[i].style.display = "inline";
         //console.log("HEY")
     } */
    var user = firebase.auth().currentUser;

    document.getElementById('username').innerHTML = " " + user.displayName;
    if (user.displayName === "Cameron Thompson" || user.displayName === "Sariah Thompson") {
        document.getElementById("addRecBtn").style.display = "block";
    }


}

function loginUser() {
    console.log("LOG IN BUTTON CLICK")
    var email = document.getElementById('email').value;
    console.log(email + " FROM LOGIN FORM")
    var password = document.getElementById('password').value;

    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .then(function () {
            apple();
            loadUserRecs();

        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });


}

function android() {
    document.getElementById('user').style.display = "none";
    document.getElementById('masterLogIn').style.display = "block";
    document.getElementById("addRecBtn").style.display = "none";
}

function logOut() {
    firebase.auth().signOut().then(function() {
        android();
      }).catch(function(error) {
        // An error happened.
      });
}

function signinasguest() {
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        unBlocker();
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.error(errorCode + " " + errorMessage);
      });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log(user)
        apple();
        unBlocker();
    } else {
        // No user is signed in.
        blocker();
        $(window).on('load',function(){
            $('#login').modal('show');
          });
        $('#login').modal({backdrop: 'static', keyboard: false})  
    }
});