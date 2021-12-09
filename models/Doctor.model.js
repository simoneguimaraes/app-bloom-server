const { Schema, model } = require("mongoose");

const DoctorFormSchema = new Schema({
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
    required: true,
    default: new Date(),
    trim: true,
  },
  motiveForTreatment: {
    type: String,
    enum: ["Ansiedade", "Depressão", "Outros"],
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
});

const DoctorModel = model("DoctorForm", DoctorFormSchema);

module.exports = DoctorFormSchema;
