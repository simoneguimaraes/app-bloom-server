const express = require("express");
const router = express.Router();

const ArticleModel = require("../models/Article.model");
const Model = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const DoctorProfileModel = require("../models/DoctorProfile.model");

// Criar artigo
router.post(
  "/:contentType/:contentId/add-article",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      const newArticle = await ArticleModel.create({
        ...req.body,
        ...req.params,
        commentCreator: loggedInUser._id,
        commentId: Date.now().toString(),
      });

      await DoctorProfileModel.findOneAndUpdate(
        { _id: loggedInUser._id },
        {
          $push: {
            userArticle: newArticle._id,
          },
        }
      );

      return res.status(201).json(newArticle);
    } catch (err) {
      next(err);
    }
  }
);

// Exibir ARTIGO por conteúdo (R)

router.get(
  "/:contentType/:contentId/contentArticle",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { contentType, contentId } = req.params;
      const contentArticle = await ArticleModel.find({
        contentType: contentType,
        contentId: contentId,
      }).populate("articleCreator");
      return res.status(200).json(contentComments);
    } catch (error) {
      next(error);
    }
  }
);

//Exibir um artigo (R)

router.get(
  "/:articleId/show-article",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { articleId } = req.params;

      const showArticle = await ArticleModel.findOne({ _id: articleId });

      if (showArticle) {
        return res.status(200).json(showArticle);
      }
      return res.status(400).json({ error: "Artigo não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

// Editar um artigo (U)
router.put(
  "/:articleId/edit-article",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { articleId } = req.params;

      const updatedArticle = await ArticleModel.findOneAndUpdate(
        { _id: articleId },
        { $set: { ...req.body } }
      );

      if (updatedArticle) {
        return res.status(200).json(updatedArticle);
      }
      return res.status(400).json({ error: "Artigo não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

// Exibir artigo por usuario

router.get(
  "/DoctorProfile/userArticle",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const contentArticle = await ArticleModel.find({
        articleCreator: loggedInUser._id,
      });
      return res.status(200).json(contentArticle);
    } catch (error) {
      next(error);
    }
  }
);

// Editar um artgio (U)
router.put(
  "/:articleId/edit-article",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { articleId } = req.params;

      const updatedArticle = await ArticleModel.findOneAndUpdate(
        { _id: articleId },
        { $set: { ...req.body } }
      );

      if (updatedArticle) {
        return res.status(200).json(updatedArticle);
      }
      return res.status(400).json({ error: "Artigo não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

// Deletar um artigo (D)
router.delete(
  "/delete-article/:articleId",
  isAuthenticated,
  attachCurrentUser,

  async (req, res, next) => {
    try {
      const { articleId } = req.params;
      const loggedInUser = req.currentUser;

      const deletionResult = await ArticleModel.deleteOne({ _id: articleId });
      if (deletionResult.n > 0) {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: loggedInUser._id },
          {
            $pull: {
              userArticle: articleId,
            },
          }
        );

        if (updatedUser) {
          return res.status(200).json({});
        }
        return res.status(404).json({
          error:
            "Não foi possível deletar o artigo, pois o usuario não foi encontrado.",
        });
      }
      return res.status(404).json({ error: "Artigo não encontrado" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
