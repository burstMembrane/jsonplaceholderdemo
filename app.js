var express = require('express');
var request = require('request');
var rp = require('request-promise');
var port = 3000;
var app = express();

// using ES6 syntax and promises to return and manipulate a json request
// also uses external stylesheet (bootstrap)

// need to install ejs and set as engine to render .ejs file
app.set("view-engine", "ejs");
app.use('/static', express.static('public'));

// function to create a new PERSON Object
function Person(name, username, email) {
    this.name = name;
    this.username = username;
    this.email = email;
};

// Root route
app.get('/', (req, res) => {
    // rewrite using request promises
    rp("https://jsonplaceholder.typicode.com/users")
        .then((body) => {
            var people = [];
            //  Parse JSON DATA
            var data = JSON.parse(body);
            for(var i = 0; i < data.length; i++) {
                // add new person objects to array
                people[i] = new Person(data[i].name, data[i].username, data[i].email);
            }
            res.render('index.ejs', { people: people });
        })
        .catch((err) => {
            console.log('ERROR!', err);
        });
});

// Start development server
app.listen(port, "localhost", (req, res) => {
    console.log(`server running on http://localhost:${port}`);

});