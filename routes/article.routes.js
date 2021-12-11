const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");

const salt_rounds = 10;

const UserModel = require("../models/User.model");
const ArticleModel = require("../models/Article.model");

//CRUD
//POST - criar um post
router.post(
  "/article/create",
  isAuthenticated,
  attachCurrentUser,
  isDoctor,
  async (req, res) => {
    try {
      const doctorInfo = await DoctorProfileModel.create({
        ...req.body,
        userId: req.currentUser[1]._id,
      });

      res.status(201).json(doctorInfo);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

module.exports = router;
