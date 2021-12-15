const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isPatient = require("../middlewares/isPatient");

const uploader = require("../config/cloudinary.config");
const salt_rounds = 10;
const UserModel = require("../models/User.model");
const PatientDailyReviewModel = require("../models/PatientDailyReview.model");

//CRUD
//POST - criar um daily review
router.post(
  "/daily/create",
  isAuthenticated,
  attachCurrentUser,
  isPatient,
  async (req, res) => {
    try {
      const [profile, user] = req.currentUser;

      const dailyReview = await PatientDailyReviewModel.create({
        ...req.body,
      });
      return res.status(201).json(dailyReview);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

//GET - mostrar todos os daily reviews

router.get("/daily", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const [profile, loggedInUser] = req.currentUser;

    if (loggedInUser && profile) {
      const dailyReview = await PatientDailyReviewModel.find();
      // Responder o cliente com os dados do usuário. O status 200 significa OK
      return res.status(200).json(dailyReview);
    } else {
      return res.status(404).json({ msg: "No daily review was found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
