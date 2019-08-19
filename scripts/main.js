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

  function login() {
    //console.log("HELOO")
    var userl = document.getElementById('email').value;
    var passl = document.getElementById('password').value;
    var user = 'camthomp96@gmail.com';
    var pass = 'a';
    var username = "Cameron"
    //console.log(userl)
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

  }


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

  function addIt(recipe) {
    // Add the recipe to the recipe array
    userRecipes.push(recipe)

    //Create a new list item
    var listItem = document.createElement("li");

    //Create a new link
    var a = document.createElement("a");

    //Create the text for the link bassed on the recipe
    var textnode = document.createTextNode(recipe);

    //Grab the existing list
    var list = document.getElementById("recipeBook");

    //Create a link based on the recipe
    var htmlLink = getHTMLlink(recipe);

    //Set the href attribute
    a.setAttribute('href', htmlLink);

    //add the text for the link
    a.textContent = textnode.textContent;

    //Add the link to the list item
    listItem.appendChild(a);

    //Add the list item to the list
    list.appendChild(listItem)

  }

  function recCardTemplate(recipe, url) {

    var card = document.createElement("div");
    card.classList.add("card")

    var img = document.createElement("IMG");
    console.log(recipe);
    img.setAttribute("src", recipe.image);
    img.classList.add("card-img-top");
    img.setAttribute("alt", "The Pulpit Rock");

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
    makeIt.setAttribute("onclick", "getRec(" + "\"" + url + "\"" +")");
    makeIt.dataset.toggle = "modal"
    makeIt.dataset.target = "#currentRec";
    var makeItName = document.createTextNode("Make It!");
    makeIt.appendChild(makeItName);

    card.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardAuthor);
    cardBody.appendChild(makeIt);
    card.appendChild(cardBody);

    //document.body.appendChild(card);

    document.getElementById("allRecs").appendChild(card)
  }

  function getRecs() {
    let urls = ["https://cdthomp1.github.io/what-can-I-make/recipes/macaroni-and-cheese-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/baked-garlic-cheddar-chicken-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/cream-cheese-and-chicken-taquitos-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-ranch-wraps-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-low-mein-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-dumpling-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/blackened-chicken-and-avocado-salad-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/crockpot-chili-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/baked-cream-cheese-spaghetti-r.json",
      "https://cdthomp1.github.io/what-can-I-make/recipes/dill-oyster-crackers-r.json"
    ];

    urls.forEach(url => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
          recCardTemplate(recipe, url)
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    });
  }

  getRecs();

  function getRec(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let recipe = JSON.parse(this.responseText)
  
        document.getElementById(`recipe-name`).innerHTML = recipe.title;
  
          recipe.ingredients.forEach(ingredient =>{
              addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'ingredients')
          })
  
          recipe.directions.forEach(direction =>{
              addItems(direction.process, 'directions')
          })  
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }


  function addItems(item,list){
    
    var ul = document.getElementById(list);
    var li = document.createElement("li");
    li.setAttribute('id',item);
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

  // function backToTop() {
  //   window.scrollTo(0, 0);
  // }

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