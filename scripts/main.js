function search_recipe() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('card-title');
  let y = document.getElementsByClassName('card');
  let z = document.getElementsByClassName('card-text');

  for (i = 0; i < x.length; i++) {

    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      y[i].style.display = "none";
    } else {
      y[i].style.display = "";
    }
  }
}

var database = firebase.database();
var db = firebase.firestore();

/* function login() {
  //console.log("HELOO")
  var userl = document.getElementById('email').value;
  var passl = document.getElementById('password').value;
  var user = 'camthomp96@gmail.com';
  var pass = 'a';
  var username = "Cameron"
  console.log(userl)
  //console.log(passl)
  if (user === userl && pass === passl) {
    document.getElementById('masterLogIn').style.display = "none";
    document.getElementById('user').style.display = "block";
    var adds = document.getElementsByClassName('add');
    document.getElementById('username').innerHTML = " " + username;

    for (var i = 0; i < adds.length; i++) {
      adds[i].style.display = "inline";
      //console.log("HEY")
    }

  }

} */


window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 380 || document.documentElement.scrollTop > 380) {
    document.getElementById("topbtn").style.display = "block";
  } else {
    document.getElementById("topbtn").style.display = "none";
  }
}


var userRecipes = [];

function getHTMLlink(recipe) {

  var newRec = recipe.toLowerCase().replace(/\s/g, "-")
  return newRec + ".html"
}



function recCardTemplate(recipe, url, currentDiv) {

  var card = document.createElement("div");
  card.classList.add("card")

  var img = document.createElement("IMG");
  console.log(recipe);
  if (recipe.image === "") {
    img.setAttribute("src", "https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=");
  } else {
    img.setAttribute("src", recipe.image);
  }
  img.classList.add("card-img-top");
  img.setAttribute("alt", "food picture here");

  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");

  var cardName = document.createTextNode(recipe.title);
  cardTitle.appendChild(cardName);

  var cardAuthor = document.createElement("p");
  cardAuthor.classList.add("card-text");

  var cardAuthorName = document.createTextNode(recipe.author);
  cardAuthor.appendChild(cardAuthorName);

  var makeIt = document.createElement("button");
  makeIt.classList.add("btn");
  makeIt.classList.add("btn-primary");
  makeIt.setAttribute("onclick", "getRec(" + "\"" + url + "\"" + ")");
  makeIt.dataset.toggle = "modal"
  makeIt.dataset.target = "#currentRec";
  var makeItName = document.createTextNode("Make It!");
  makeIt.appendChild(makeItName);

  var additSpan = document.createElement("span");
  additSpan.classList.add("add");

  var addIt = document.createElement("button");
  addIt.classList.add("btn")
  addIt.classList.add("btn-success")
  addIt.setAttribute("onclick", "addIt(\"" + recipe.title + "\"" + ")");
  var addItName = document.createTextNode("Add It!");
  addIt.appendChild(addItName);
  additSpan.appendChild(addIt);

  card.appendChild(img);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(makeIt);
  cardBody.appendChild(additSpan);
  card.appendChild(cardBody);

  //document.body.appendChild(card);

  document.getElementById(currentDiv).appendChild(card)
}



function getAllRecs() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let recipes = JSON.parse(this.responseText)
      recipes.forEach(rec => {
        var url = makePath(rec.name)
        getRecs(url, "allRecs");
      })
    }
  };
  xhttp.open("GET", "https://api.github.com/repos/cdthomp1/what-can-I-make/contents/recipes", true);
  xhttp.send();
}

function getFromFireBase(rec) {
  var url = makePath(rec);
  getRecs(url, "recipeBook");
}

function makePath(name) {
  var rec = name.toString()
  console.log(name)
  console.log(rec.includes(" "))
  if (rec.includes(" ")) {
    console.log("HELLO")
    var recipe = rec.replace(/\s+/g, '-').toLowerCase()
    var real = recipe + "-r.json"
    console.log("=======================" + real)
    return "https://cdthomp1.github.io/what-can-I-make/recipes/" + real;
  }
  return "https://cdthomp1.github.io/what-can-I-make/recipes/" + name;
}


function getRecs(url, currentDiv) {
  let urls = ["https://cdthomp1.github.io/what-can-I-make/recipes/macaroni-and-cheese-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/baked-garlic-cheddar-chicken-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/cream-cheese-and-chicken-taquitos-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-ranch-wraps-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-low-mein-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-dumpling-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/blackened-chicken-and-avocado-salad-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/crockpot-chili-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/baked-cream-cheese-spaghetti-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/cheese-ball-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/creamy-dill-dip-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/fluffy-peanut-butter-dip-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/peanut-butter-dip-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/quick-fruit-dip-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/creamy-spinach-tomato-tortellini-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/creamy-tomato-italian-parmesan-chicken-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/fettuccine-alfredo-with-chicken-broccoli-bacon-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/mexican-casserole-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/sausage-pepper-and-rice-skillet-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/slow-cooker-honey-garlic-chicken-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/slow-cooker-mongolian-beef-r.json",
    "https://cdthomp1.github.io/what-can-I-make/recipes/crusty-bread-r.json",
  ];
urls.forEach(u => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let recipe = JSON.parse(this.responseText)
      //recCardTemplate(recipe, url, currentDiv)
      writeRecTwo(recipe);
    }
  };
  xhttp.open("GET", u, true);
  xhttp.send();

})


}

function getRec(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let recipe = JSON.parse(this.responseText)

      document.getElementById(`recipe-name`).innerHTML = recipe.title;

      recipe.ingredients.forEach(ingredient => {
        addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'ingredients')
      })

      recipe.directions.forEach(direction => {
        addItems(direction.process, 'directions')
      })
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function addItems(item, list) {

  var ul = document.getElementById(list);
  var li = document.createElement("li");
  li.setAttribute('id', item);
  li.appendChild(document.createTextNode(item));
  ul.appendChild(li);

}

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if (!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  } else { // Hide backToTopButton
    if (backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function () {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackToTop);

function smoothScrollBackToTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
};

function clearData() {
  document.getElementById("ingredients").innerHTML = "";
  document.getElementById("directions").innerHTML = "";
}

function showBeef() {
  console.log("SHOW BEEF");
  document.getElementById("allRecs").style.display = "none";
  document.getElementById("beefRecs").style.display = "block";
  beefRecs.forEach(rec => {
    recCardTemplate(rec, "#", "beefRecs");
  })
}

function seeMyBook() {
  console.log("SHOW MY BOOK");
  document.getElementById("allRecs").style.display = "none";
  document.getElementById("recipeBook").style.display = "block";
  recsFromFirebase.push(userRecipes)
  recsFromFirebase.forEach(rec => {
    getFromFireBase(rec);
  })
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
  writeRec()
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



//TODO: Loop through all recipes with this to put in firebase
function writeRecTwo(recipesss) {
db.collection("thompsonRecs").doc(recipesss.title).set(recipesss)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

var recsFromFirebase = [];

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
var beefRecs = [];
function getFirebaseRecs(){
  db.collection("thompsonRecs").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        if(doc.data().category === "Beef") {
          beefRecs.push(doc.data());
        }
        recCardTemplate(doc.data(), "#", "allRecs")
        console.log(doc.id, " => ", doc.data());
    });
});
}


var recIngredients = [];
var recDirections = [];

var recObj = {
    "title": "",
    "author": "",
    "image": "",
    "category": "",
    "tags": [],
    "ingredients": [{
        "type": "",
        "amount": "",
        "ingredient": ""
    }],
    "directions": [{
        "step": "",
        "direction": ""
    }]
};


function addIngredientInput() {
    var ingredient = {
        "type": "",
        "amount": "",
        "ingredient": ""
    };
    var quantity = document.getElementById("quantity").value;
    var name = document.getElementById("name").value;

    var ul = document.getElementById("ingredientList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(quantity + " " + name));
    ul.appendChild(li);

    document.getElementById("quantity").value = "";
    document.getElementById("name").value = "";

    ingredient.amount = quantity;
    ingredient.ingredient = name;
    recIngredients.push(ingredient)
   // console.log(ingredient)
    //console.log(recIngredients)
}

function addDirectionInput() {
    var directionObj = {
        "step": "",
        "process": ""
    }
    var step = document.getElementById("step").value;
    var direction = document.getElementById("direction").value;

    directionObj.step = step;
    directionObj.process = direction;
    recDirections.push(directionObj);


    var ol = document.getElementById("directionList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(direction));
    ol.appendChild(li);

    document.getElementById("step").value = "";
    document.getElementById("direction").value = "";
}

function addTitle() {
    var recName = document.getElementById("recName").value;
    recObj.title = recName;
    document.getElementById("title").innerHTML = `Preview of ${recName}!`;
}

function addAuthor() {
    var author = document.getElementById("authorInput").value;
    recObj.author = author;
    document.getElementById("author").innerHTML = `By: ${author}!`;
}

function addImage() {
    var img = document.getElementById("headerImage");
    var src = document.getElementById("image2").value;
    console.log(src)
    
    if (src === "none") {
        src = "https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4="
    } 
    console.log(src)
    recObj.image = src;
    img.setAttribute("src", src);
    img.classList.add("card-img-top");
    img.setAttribute("alt", "Header Image");
}

function readURL(input) {
    console.log(input.files)
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#headerImage')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

function addTag() {
    var title = recObj.title.replace(/\s+/g, ',').toLowerCase()
    var taggArr = title.split(',')
    return taggArr
}

function confirmRec() {
    recObj.tags = addTag();
    recObj.ingredients = recIngredients;
    recObj.directions = recDirections;
    
    var e = document.getElementById("category");
    var category = e.options[e.selectedIndex].value;
  
    recObj.category = category;

    var title = recObj.title.replace(/\s+/g, '-').toLowerCase()

   
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recObj));
    return recObj;
    //$('<a id="save" href="data:' + data + '" download="' + title + "-r" + '.json' + '">Save Recipe</a>').appendTo('#confirm');
}

function addToFirebase() {
    var rec = confirmRec();

  db.collection("thompsonRecs").doc(rec.title).set(rec)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      var no = "You don't have permision to do that"
      alert("Error writing recipe: " + error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // your code here
  console.log("LOADED")
  getFirebaseRecs()
}, false);