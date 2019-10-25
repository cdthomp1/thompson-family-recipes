var database = firebase.database();
var db = firebase.firestore();

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
  //console.log(src)

  if (src === "none") {
    src = "https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4="
  }
  //console.log(src)
  recObj.image = src;
  img.setAttribute("src", src);
  img.classList.add("card-img-top");
  img.setAttribute("alt", "Header Image");
}

function readURL(input) {
  // console.log(input.files)
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
  writeRec(rec)
}
