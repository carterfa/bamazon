var path = require("path");

module.exports = function (app) {

  //shows home/customer page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //shows manager page
  app.get("/manager", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/manager.html"));
  });

  //catch all page
  app.get("*", function (req, res) {
    res.send("404");
  });

}