// Dependencies
var express = require("express");

// Sets up Express
var app = express();
var PORT = process.env.PORT || 8080;

// Require models
var db = require("./models");

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Sync models and turn on server
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});