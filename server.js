const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const mongojs = require("mongojs");

var app = express();

var databaseUrl = "KotakuScraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  axios.get("https://kotaku.com/").then(function(response) {
  const $ = cheerio.load(response.data);
    console.log("made it here");
    $("article.js_post_item").each(function(i, element) {

      var headline = $(element).text();
      // var summary = $(element).text();
      // var urlLink = $(element).text();

      if (headline) {//&& summary && urlLink
        
      
        db.scrapedData.insert({
          headline: headline
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });
})

app.listen(3000, function() {
  console.log("App running on port 3000!");
});