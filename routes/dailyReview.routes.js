const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");
const salt_rounds = 10;
const UserModel = require("../models/User.model");
const ArticleModel = require("../models/PatientDailyReview.model");

//CRUD
//POST - criar um daily
router.post(
  "/dailyReview/create",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const [profile, user] = req.currentUser;
      const article = await dailyReview.create({
        ...req.body,
      });
      return res.status(201).json(review);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);
//UDPATE - editar um post
router.patch(
  "/:articleId/update",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { reviewId } = req.params;
      const response = await DailyReview.findOneAndUpdate(
        { _id: reviewId },
        { $set: req.body },
        { new: true, runValidation: true }
      );
      return res.status(201).json(response);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);
//DELETE - deletar um post
module.exports = router;