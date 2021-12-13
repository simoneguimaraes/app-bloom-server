//criar um modelo Schema de como seria um post do fórum (pode ser postado tanto pelo médico quanto pelo paciente)
const { Schema, model } = require("mongoose");
const ForumSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  websiteLink: {
    type: String,
    trim: true,
    required: true,
  },
  pictures: {
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
const ForumModel = model("Forum", ForumSchema);
module.exports = ForumModel;
