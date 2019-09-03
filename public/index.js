const loginBtn = document.getElementById("btnlogin");
var database = firebase.database();
var db = firebase.firestore();

export var recsFromFirebase = [];

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


function addIt(recipe) {

    console.log(typeof (recipe))
    // Add the recipe to the recipe array
    userRecipes.push(recipe)
  
    //Create a new list item
    var listItem = document.createElement("li");
  
    //Create a new link
  
  
    //Create the text for the link bassed on the recipe
    var textnode = document.createTextNode(recipe.title);
  
    //Grab the existing list
    var list = document.getElementById("recipeBook");
  
    listItem.textContent = textnode
  
    //Create a link based on the recipe
  
  
    //Set the href attribute
  
    //Add the list item to the list
    list.appendChild(listItem)
  
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
  
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  
    writeUserData(uid, name, email, recipe);
  
  
  
  
  }
  
  function writeUserData(userId, name, email, rec) {
    db.collection("users").doc(userId).set({
        savedRecs: userRecipes
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }



function loadUserRecs() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
  
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  
    var docRef = db.collection("users").doc(uid);
  
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data().savedRecs);
        recsFromFirebase.push(doc.data().savedRecs);
        console.log(userRecipes)
  
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  
  }