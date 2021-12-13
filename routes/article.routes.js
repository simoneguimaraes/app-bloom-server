const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const isDoctor = require("../middlewares/isDoctor");
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
      const [profile, user] = req.currentUser;
      if (user.role === "PATIENT") {
        //verifica se o usuário é paciente mesmo
        return res.status(400).json({ msg: "Esse usuário não é médico." });
      }
      const article = await ArticleModel.create({
        ...req.body,
      });
      return res.status(201).json(article);
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
  isDoctor,
  async (req, res) => {
    try {
      const [profile, user] = req.currentUser;
      if (user.role === "PATIENT") {
        //verifica se o usuário é paciente mesmo
        return res.status(400).json({ msg: "Esse usuário não é médico." });
      }
      const { articleId } = req.params;
      const response = await ArticleModel.findOneAndUpdate(
        { _id: articleId },
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

//GET - mostrar os artigos
//GET - mostrar os posts
router.get("/articles", isAuthenticated, attachCurrentUser, async (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const [profile, loggedInUser] = req.currentUser;

    if (loggedInUser && profile) {
      const articles = await ForumModel.find();
      // Responder o cliente com os dados do usuário. O status 200 significa OK
      return res.status(200).json(articles);
    } else {
      return res.status(404).json({ msg: "No article was found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//DELETE - deletar o artigo

module.exports = router;
