const { Schema, model } = require("mongoose");
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: String,
    trim: true,
    required: true,
  },
  yearPublished: {
    type: Number,
    trim: true,
    required: true,
  },
  websiteLink: {
    type: String,
    trim: true,
    required: true,
  },
  tags: [
    {
      type: String,
      enum: [
        "Doença Degenerativa",
        "Saúde Mental",
        "Ansiedade",
        "Fibromialgia",
        "Esclerose Múltipla",
        "Mal de Parkinson",
        "Epilepsia",
        "Esquizofrenia",
        "Glaucoma",
        "Depressão",
        "Outro",
      ],
      required: true,
      default: "Outro",
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
const ArticleModel = model("Article", ArticleSchema);
module.exports = ArticleModel;