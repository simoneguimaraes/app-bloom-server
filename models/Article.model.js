//criar um modelo Schema de como seria um artigo postado pelo médico
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const ArticleSchema = new Schema({
    articleId: String,
    title: {String, required: true},
    article: { type: String, required: true},
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProgile",
      required: true,
    },
    body: String,
    contentType: { type: String, required: true, enum: ["Psiquiatra", "Neurologista", "Outro"]},
    contentId: { type: String, required: true },
    default: Date.now(),
    trim: true,
    required: true,
  
  articleId: { type: Schema.Types.ObjectId, ref: "Article" } 
})
  const articleModel = model(
    "articleModel",
    articleModelSchema
  );
  
  module.exports = articleModel;


