const { Schema, model } = require("mongoose");

const DoctorProfileSchema = new Schema({
  specialty: {
    type: String,
    enum: ["Psiquiatra", "Neurologista", "Outro"],
    required: true,
    default: "Outro",
  },
  crmDoctor: {
    type: Number,
    required: true,
  },
  prescription: {
    type: String,
    enum: ["Sim", "Não"],
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    default: "Outro",
  },
  state: {
    type: String,
    required: true,
    default: "Outro",
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  tags: [{
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
  }],
  userId: { type: Schema.Types.ObjectId, ref: "User" } 
});

const DoctorProfileModel = model("DoctorProfile", DoctorProfileSchema);

module.exports = DoctorProfileModel;
