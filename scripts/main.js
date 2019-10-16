var searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});

var search = function search_recipe() {
  let input = document.getElementById('searchBar').value
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

function recCardTemplate(recipe, currentDiv) {

  var card = document.createElement("div");
  card.classList.add("card")

  var img = document.createElement("IMG");
  //console.log(recipe);
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
  makeIt.setAttribute("onclick", "getRec(" + "\"" + recipe.title + "\"" + ")");
  makeIt.dataset.toggle = "modal"
  makeIt.dataset.target = "#currentRec";
  var makeItName = document.createTextNode("Make It!");
  makeIt.appendChild(makeItName);

  /* BELOW IS SOME CODE FOR THE RECIPE BOOK OPTION */
  /*   var additSpan = document.createElement("span");
    additSpan.classList.add("add");

    var addIt = document.createElement("button");
    addIt.classList.add("btn")
    addIt.classList.add("btn-success")
    addIt.setAttribute("onclick", "addIt(\"" + recipe.title + "\"" + ")");
    var addItName = document.createTextNode("Add It!");
    addIt.appendChild(addItName);
    additSpan.appendChild(addIt); */

  card.appendChild(img);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardAuthor);
  cardBody.appendChild(makeIt);

  //BELOW IS SOME CODE FOR the RECIPE BOOK OPTION
  //cardBody.appendChild(additSpan);

  card.appendChild(cardBody);
  document.getElementById(currentDiv).appendChild(card)
}

function getRec(recipe) {
  allRecsFromFB.forEach(rec => {
    if (rec.title === recipe) {
      document.getElementById(`recipe-name`).innerHTML = rec.title;
      rec.ingredients.forEach(ingredient => {
        addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'ingredients')
      })
      rec.directions.forEach(direction => {
        addItems(direction.process, 'directions')
      })
    }
  })
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

$(".click").click((event) => {
  var id = (event.target.getAttribute("id"));
  console.log(id)
  $(".recContainer").addClass("hidden");
  $("#" + id + "Recs" + "Container").removeClass("hidden");
});
/* 
$('#currentRec').on('hidden.bs.modal', function (e) {
  // do something...
  clearData();
}) */

//TODO: Loop through all recipes with this to put in firebase
function writeRec(recipesss) {
  db.collection("thompsonRecs").doc(recipesss.title).set(recipesss)
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      alert("Error writing recipe: " + error);
    });
}
var allRecsFromFB = [];
function getFirebaseRecs() {
  db.collection("thompsonRecs").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      recCardTemplate(doc.data(),  "allRecs")
      allRecsFromFB.push(doc.data())
      if (doc.data().category === "Beef") {
        recCardTemplate(doc.data(), "beefRecs");
      }
      if (doc.data().category === "Breakfast" || doc.data().category === "breakfast") {
        recCardTemplate(doc.data(), "breakfastRecs");
      }
      if (doc.data().category === "Appetizers" || doc.data().category === "Appetizer"){ 
        recCardTemplate(doc.data(), "appRecs");
      }
      if (doc.data().category === "Beverages") {
        recCardTemplate(doc.data(), "beverageRecs");
      }
      if (doc.data().category === "Lunch") {
        recCardTemplate(doc.data(), "lunchRecs");
      }
      if (doc.data().category === "Soups") {
        recCardTemplate(doc.data(), "soupRecs");
      }
      if (doc.data().category === "Salads") {
        recCardTemplate(doc.data(), "saladRecs");
      }
      if (doc.data().category === "Poultry" || doc.data().category === "poultry" || doc.data().category === "Chicken" || doc.data().category === "chicken") {
        recCardTemplate(doc.data(), "poultryRecs");
      }
      if (doc.data().category === "Pork") {
        recCardTemplate(doc.data(), "porkRecs");
      }
      if (doc.data().category === "Seafood") {
        recCardTemplate(doc.data(), "seafoodRecs");
      }
      if (doc.data().category === "Vegetarian") {
        recCardTemplate(doc.data(), "vegetarianRecs");
      }
      if (doc.data().category === "Vegetables") {
        recCardTemplate(doc.data(), "vegetablesRecs");
      }
      if (doc.data().category === "Rice") {
        recCardTemplate(doc.data(), "riceRecs");
      }
      if (doc.data().category === "Pasta" || doc.data().category === "pasta"){
        recCardTemplate(doc.data(), "pastaRecs");
      }
      // console.log(doc.id, " => ", doc.data());
    });
  });
}


document.addEventListener('DOMContentLoaded', function () {
  getFirebaseRecs()
}, false);