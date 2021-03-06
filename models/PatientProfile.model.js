const { Schema, model } = require("mongoose");

const PatientProfileSchema = new Schema({
  birthdate: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Mulher", "Homem", "Prefiro não dizer"],
    default: "Mulher",
    required: true,
  },
  treatmentStartDate: {
    type: String,
    default: new Date(),
    trim: true,
  },
  motiveForTreatment: {
    type: String,
    enum: [
      "Ansiedade",
      "Fibromialgia",
      "Esclerose Múltipla",
      "Mal de Parkinson",
      "Epilepsia",
      "Esquizofrenia",
      "Glaucoma",
      "Depressão",
      "Outros",
    ],
    default: "Outros",
    required: true,
  },
  medicationFrequency: {
    type: String,
    enum: [
      "Todos os dias",
      "1 a 2 vezes por semana",
      "De 3 a 4 vezes por semana",
      "De 4 a 6 vezes por semana",
      "Ainda não iniciei o tratamento",
    ],
    default: "Todos os dias",
    required: true,
  },
  sleepHours: {
    type: Number,
    required: true,
  },
  weeklyExerciseHours: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  acceptedTerms: {
    type: Boolean,
    default: false,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const PatientProfileModel = model("PatientProfile", PatientProfileSchema);

module.exports = PatientProfileModel;
