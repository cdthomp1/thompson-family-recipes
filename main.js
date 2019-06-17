
function ccbs(){
    var url = "https://cdthomp1.github.io/what-can-I-make/baked-cream-cheese-spaghetti-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var recipe = JSON.parse(this.responseText)
    
          /* document.getElementById(`recipe-name`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItem(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-list')
            })
    
            recipe.directions.forEach(direction =>{
                addItem(direction.process, 'recipe-direction-list')
            })   */

        console.log(recipe)
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}


function cc(){
    let url = "https://cdthomp1.github.io/what-can-I-make/crockpot-chili-r.json"
    
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let recipe = JSON.parse(this.responseText)
    
          document.getElementById(`recipe-namea`).innerHTML = recipe.title;
    
            recipe.ingredients.forEach(ingredient =>{
                addItems(`${ingredient.amount}   ${ingredient.ingredient}`, 'recipe-ingredient-lista')
            })
    
            recipe.directions.forEach(direction =>{
                addItems(direction.process, 'recipe-direction-lista')
            })  
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
}


  function addItem(item,list){
    
    var ul = document.getElementById(list);
    var li = document.createElement("li");
    li.setAttribute('id',item);
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
    
  }

    function addItems(item,list){
    
    var ul = document.getElementById(list);
    var li = document.createElement("li");
    li.setAttribute('id',item);
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
    
  }

  ccbs()
  cc()