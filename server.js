const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");
const logger = require("morgan");
var db = require("./models");

var app = express();

var PORT = 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/KotakuScraper", { useNewUrlParser: true });

// var databaseUrl = "KotakuScraper";
// var collections = ["scrapedData"];

app.get("/scrape", function(req, res) {
  axios.get("https://kotaku.com/").then(function(response) {
  const $ = cheerio.load(response.data);
    console.log("made it here");
    $("article.js_post_item").each(function(i, element) {

      var result = {};

      result.headline = $(this).find("div.sc-3kpz0l-7").find("a").find("h1").text();
      result.summary = $(this).find("div.sc-3kpz0l-6").find("div.b8i51y-0").find("p").text();
      result.urlLink = $(this).find("div.sc-3kpz0l-7").find("a").attr("href");

        db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
      
    });
    res.send("Scrape Complete");
  });
})

app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  // Create a new note and pass the req.body to the entry
  db.Note.create(req.body)
    .then(function(dbNote) {
      // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

app.get("/", function (req,res) {

})

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});