const loginBtn = document.getElementById("btnlogin");


function apple() {

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

function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var loggedIn = false;
    if (loggedIn === false){
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(email, password);
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
            })
            .then(function () {
                apple();
                loggedIn = true;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert('Please, check information provided and try again.');
                // ...
            });
    }

};

$(loginBtn).click(() => {
    login();
});