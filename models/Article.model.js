//criar um modelo Schema de como seria um artigo postado pelo médico
const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  crmDoctor: {
    type: Number,
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
