const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");
const salt_rounds = 10;
const UserModel = require("../models/User.model");
const ForumModel = require("../models/Forum.model");

//CRUD
//POST - criar um post
router.post(
  "/forum/create",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    7;
    try {
      const [profile, user] = req.currentUser;

      const postForum = await ForumModel.create({
        ...req.body,
      });
      return res.status(201).json(postForum);
    } catch (err) {
      console.error(err);
      // O status 500 signfica Internal Server Error
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

//GET - mostrar os posts
router.get("/forum", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const [profile, loggedInUser] = req.currentUser;

    if (loggedInUser && profile) {
      const forumPosts = await ForumModel.find();
      // Responder o cliente com os dados do usuário. O status 200 significa OK
      return res.status(200).json(forumPosts);
    } else {
      return res.status(404).json({ msg: "No post was found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//UDPATE - editar um post
router.patch(
  "/update/:forumId",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const [profile, user] = req.currentUser;

      const { forumId } = req.params;
      const response = await ForumModel.findOneAndUpdate(
        { _id: forumId },
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

//DELETE - deletar o post

router.delete(
  "/delete/:forumId",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const result = await ForumModel.deleteOne({ _id: req.params.id });

      if (result) {
        return res.status(200).json({ message: "Post deleted successfully." });
      }

      return res.status(404).json({ msg: "Post not found." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
