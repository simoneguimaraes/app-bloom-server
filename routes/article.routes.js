const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");

const salt_rounds = 10;

const UserModel = require("../models/User.model");
const ArticleModel = require("../models/ArticleProfile.model");

//CRUD
