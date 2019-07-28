const db = require('../models/index.js');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = controller = {
  index: function (req, res) {
    res.render('index');
  },

  kotakuScrape: function (req, res) {
    axios.get("https://kotaku.com/").then(function(response) {
    const $ = cheerio.load(response.data);

      $("article.js_post_item").each( function (i, element){

        const result = {};
        
        result.headline = $(this).find("div.sc-3kpz0l-7").find("a").find("h1").text();
        result.summary = $(this).find("div.sc-3kpz0l-6").find("div.b8i51y-0").find("p").text();
        result.urlLink = $(this).find("div.sc-3kpz0l-7").find("a").attr("href");
      
          db.Article.create(result)
          .then(() => {
            location.reload()
          })
          .catch((err) => {
            console.log(err);
          });
        
      });
    });
  },

  kotakuArticles: (req, res) => {
    db.Article.find({})
      .then((dbArticle) => {
        res.json(dbArticle)
      })
      .catch(err => {
        res.json(err)
      });
  },

  oneArticle: (req, res) => {
    db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  deleteArticle: function (req, res) {
    db.Article.deleteOne({ _id: req.params.id })
    .then(() => db.Note.remove({ article: req.params.id }))
    .then(() => location.reload())
    .catch(err => res.json(err))
  }
}