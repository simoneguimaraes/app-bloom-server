const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["DOCTOR", "PATIENT"],
    required: true,
    default: "PATIENT",
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
