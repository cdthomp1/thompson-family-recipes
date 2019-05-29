var qhttp = require('q-io/http');

qhttp.read("https://cdthomp1.github.io/what-can-I-make/baked-cream-cheese-spaghetti-r.json")
.then(function (json) {
    console.log(JSON.parse(json))
        
        
    })
    .then(null, console.error)