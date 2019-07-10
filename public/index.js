//const signupBtn = document.getElementById("btnsignup");
const loginBtn = document.getElementById("btnlogin");
//const nameBox = document.getElementById("namebox");
//var signingIn = false;

function loadPage() {};

function login() {
    var login = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then(function () {
            console.log("REDIRECT")
            window.location.replace('testRecipe.html');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Please, check information provided and try again.');
            // ...
        });
};

$(loginBtn).click(() => {
    login();
});