const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");

const salt_rounds = 10;

const UserModel = require("../models/User.model");
const PatientProfileModel = require("../models/PatientProfile.model");

// Crud - HTTP POST
//POST - criar um perfil
router.post(
  "/patient-info/create",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const [profile, user] = req.currentUser;
      if (user.role === "DOCTOR") {
        //verifica se o usuário é paciente mesmo
        return res.status(400).json({ msg: "Esse usuário não é paciente." });
      }
      const foundProfile = await PatientProfileModel.findOne({
        userId: user._id,
      });
      if (foundProfile) {
        return res
          .status(400)
          .json({ msg: "O usuário já possui o perfil cadastrado." });
      }
      const patientInfo = await PatientProfileModel.create({
        ...req.body,
        userId: req.currentUser[1]._id,
      });
      res.status(201).json(patientInfo);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

//GET - ver o perfil do paciente
router.get("/patient-info", isAuthenticated, attachCurrentUser, (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const [profile, loggedInUser] = req.currentUser;
    if (loggedInUser.role === "DOCTOR") {
      //verifica se o usuário é paciente mesmo
      return res.status(400).json({ msg: "Esse usuário não é paciente." });
    }
    if (loggedInUser && profile) {
      // Responder o cliente com os dados do usuário. O status 200 significa OK
      return res.status(200).json({ ...profile._doc, ...loggedInUser._doc });
    } else {
      return res.status(404).json({ msg: "User not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//PATCH - editar um perfil
router.patch(
  "/patient-info/update",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser[1];

      if (loggedInUser.role === "DOCTOR") {
        //verifica se o usuário é paciente mesmo
        return res.status(400).json({ msg: "Esse usuário não é paciente." });
      }

      if (loggedInUser) {
        const response = await PatientProfileModel.findOneAndUpdate(
          { userId: loggedInUser._id },
          { $set: req.body },
          { new: true, runValidation: true }
        );
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ msg: "User not found." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

module.exports = router;
