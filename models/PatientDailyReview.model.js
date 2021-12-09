const { Schema, model } = require("mongoose");

const PatientDailyReviewSchema = new Schema({
  wellbeingToday: {
    type: Number,
    required: true,
  },
  humorAlteration: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  nausea: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  memoryLoss: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  desorientation: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  dizziness: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  constipation: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const PatientDailyReviewModel = model(
  "PatientDailyReview",
  PatientDailyReviewSchema
);

module.exports = PatientDailyReviewModel;
