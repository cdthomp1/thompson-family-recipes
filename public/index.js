
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


function loadPage() {};

function login() {
    var login = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log("TACO BELL")
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then(function () {
            apple();
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