require("dotenv").config();
const mongoose = require("mongoose");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/KotakuScraper";

module.exports = connection = mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

