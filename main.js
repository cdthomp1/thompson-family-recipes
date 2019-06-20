
function bakedCreanCheeseSpaghetti(){
    var url = "https://cdthomp1.github.io/what-can-I-make/recipes/baked-cream-cheese-spaghetti-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })

        console.log(recipe)
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}


function crockpotChili(){
    let url = "https://cdthomp1.github.io/what-can-I-make/recipes/crockpot-chili-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function macCheese() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/macaroni-and-cheese-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function bakedGarlicCheddarChicken() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/baked-garlic-cheddar-chicken-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function blackednChickenandAvocadoSalad() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/blackened-chicken-and-avocado-salad-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function chickenDumpling() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-dumpling-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function chickenLoMein() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-low-mein-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}

function chickenRanchWraps() {
  let url = "https://cdthomp1.github.io/what-can-I-make/recipes/chicken-ranch-wraps-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-list')
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


  