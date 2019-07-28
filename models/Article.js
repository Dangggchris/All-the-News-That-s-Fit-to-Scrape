var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  
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
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

module.exports = Article = mongoose.model("Article", ArticleSchema);;