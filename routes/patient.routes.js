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
      const patientInfo = await PatientProfileModel.create({ ...req.body });
      res.status(201).json(patientInfo);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

/////////////////////////////--------------------------------
//PATCH - editar um perfil
router.patch(
    "/patient-info/update",
    isAuthenticated,
    attachCurrentUser,
    async (req, res) => {
      try {
        const loggedInUser = req.currentUser[1];
  
        if (loggedInUser) {
          const response = await UserModel.findOneAndUpdate(
            { _id: loggedInUser._id },
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


//GET - ver o perfil do paciente
router.get("/patient-info", isAuthenticated, attachCurrentUser, (req, res) => {
    try {
      // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
      const [profile, loggedInUser] = req.currentUser;
  
      if (loggedInUser) {
        // Responder o cliente com os dados do usuário. O status 200 significa OK
        return res.status(200).json(profile, loggedInUser);
      } else {
        return res.status(404).json({ msg: "User not found." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  });
  



module.exports = router;
