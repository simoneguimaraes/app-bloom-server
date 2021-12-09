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
});

const UserModel = model("UserForm", UserFormSchema);

module.exports = UserFormSchema;
