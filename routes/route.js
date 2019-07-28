const express = require("express");
const router = express.Router();
const controller = require('../controllers/application.js');


router.get('/', controller.index);

router.get("/scrape", controller.kotakuScrape);

router.get("/articles", controller.kotakuArticles);

router.get("/articles/:id", controller.oneArticle);

router.delete("/articles/:id", controller.deleteArticle);

module.exports = router;