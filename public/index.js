const loginBtn = document.getElementById("btnlogin");
//var database = firebase.database();
//var db = firebase.firestore();


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

    console.log("APPLE CALLED")

    document.getElementById('masterLogIn').style.display = "none";
    document.getElementById('user').style.display = "block";
    var adds = document.getElementsByClassName('add');
    document.getElementById('username').innerHTML = " " + username;

    for (var i = 0; i < adds.length; i++) {
        adds[i].style.display = "inline";
        //console.log("HEY")
    }


    var user = firebase.auth().currentUser;

    document.getElementById('username').innerHTML = " " + user.displayName;



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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
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

