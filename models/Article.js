const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required:true
  },
  urlLink: {
    type: String,
    required: true
  }
});

module.exports = Article = mongoose.model("Article", ArticleSchema);;