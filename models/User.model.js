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
    enum: ["DOCTOR", "USER"],
    required: true,
    default: "USER",
  },
  profileId: { },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
