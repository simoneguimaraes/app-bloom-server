const { Schema, model } = require("mongoose");

const UserFormSchema = new Schema({
  birthdate: {
    type: Date,
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
  treatmentStartDate: {
    type: Date,
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
    type: Number,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const PatientProfileModel = model("PatientProfile", PatientProfileSchema);

module.exports = PatientProfileModel;
