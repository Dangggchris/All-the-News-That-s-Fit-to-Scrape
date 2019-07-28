require("dotenv").config();
const mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/KotakuScraper";
// const MONGODB_URI = "mongodb://localhost/mongoHeadlines";
module.exports = connection = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

