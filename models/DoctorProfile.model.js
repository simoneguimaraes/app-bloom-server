const { Schema, model } = require("mongoose");

const DoctorProfileSchema = new Schema({
  specialty: {
    type: String,
    enum: ["Psiquiatra", "Neurologista", "Outro"],
    required: true,
    trim: true,
    default: "Outro",
  },
  crmDoctor: {
    type: Number,
    trim: true,
    required: true,
  },
  prescription: {
    type: String,
    enum: ["Sim", "Não"],
    trim: true,
    required: true,
  },
  streetAddress: {
    type: String,
    trim: true,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    default: "Outro",
  },
  state: {
    type: String,
    required: true,
    trim: true,
    default: "Outro",
  },
  phoneNumber: {
    type: Number,
    required: true,
    trim: true,
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

const DoctorProfileModel = model("DoctorProfile", DoctorProfileSchema);

module.exports = DoctorProfileModel;
