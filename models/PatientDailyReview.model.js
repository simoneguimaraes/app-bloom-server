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
    default: "Não",
  },
  nausea: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
    default: "Não",
  },
  memoryLoss: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
    default: "Não",
  },
  desorientation: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
    default: "Não",
  },
  dizziness: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
    default: "Não",
  },
  constipation: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
    default: "Não",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  patientId: { type: Schema.Types.ObjectId, ref: "PatientProfile" },
});

const PatientDailyReviewModel = model(
  "PatientDailyReview",
  PatientDailyReviewSchema
);

module.exports = PatientDailyReviewModel;
