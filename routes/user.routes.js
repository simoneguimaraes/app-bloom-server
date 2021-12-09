const router = require("express").Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");
const PatientProfileModel = require("../models/PatientProfile.model");

const generateToken = require("../config/jwt.config");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");

const salt_rounds = 10;

// Crud (CREATE) - HTTP POST

//Upload de arquivos no Cloudinary
router.post(
  "/upload",
  isAuthenticated,
  attachCurrentUser,
  uploader.single("picture"),
  (req, res) => {
    if (!req.file) {
      return res.status(500).json({ msg: "Upload de arquivo falhou." });
    }
    console.log(req.file);

    return res.status(201).json({ url: req.file.path });
  }
);

// Criar um novo usuário
router.post("/signup", async (req, res) => {
  // Requisições do tipo POST tem uma propriedade especial chamada body, que carrega a informação enviada pelo cliente
  console.log(req.body);
  try {
    // Recuperar a senha que está vindo do corpo da requisição
    const { password } = req.body;
    // Verifica se a senha não está em branco ou se a senha não é complexa o suficiente
    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      // O código 400 significa Bad Request
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }
    // Gera o salt
    const salt = await bcrypt.genSalt(salt_rounds);
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, salt);
    // Salva os dados de usuário no banco de dados (MongoDB) usando o body da requisição como parâmetro
    const result = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });
    // Responder o usuário recém-criado no banco para o cliente (solicitante). O status 201 significa Created
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    // O status 500 signifca Internal Server Error
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ msg: "E-mail or password is incorrect" });
    }

    if (!bcrypt.compareSync(password, foundUser.passwordHash)) {
      return res.status(400).json({ msg: "E-mail or password is incorrect" });
    }

    const token = generateToken(foundUser);

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

// cRud (READ) - HTTP GET
// Buscar dados do usuário
router.get("/profile", isAuthenticated, attachCurrentUser, (req, res) => {
  try {
    // Buscar o usuário logado que está disponível através do middleware attachCurrentUser
    const {profile, loggedInUser} = req.currentUser;

    if (loggedInUser) {
      // Responder o cliente com os dados do usuário. O status 200 significa OK
      return res.status(200).json(profile, loggedInUser);
    } else {
      console.log(req)
      return res.status(404).json({ msg: "User not found." });
      
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

router.patch(
  "/profile/update",
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

router.delete(
  "/profile/delete",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      if (req.currentUser.role === "PATIENT") {
        const user = await UserModel.deleteOne({ _id: req.currentUser[1] });
        const profile = await PatientProfileModel.deleteOne({
          _id: req.currentUser,
        });
      } else {
        const user = await UserModel.deleteOne({ _id: req.currentUser[1] });
        const profile = await DoctorProfileModel.deleteOne({
          _id: req.currentUser,
        });
      }

      if (user && profile) {
        // Responder o cliente com os dados do usuário. O status 200 significa OK
        return res.status(200).json({ ...user, ...profile });
      } else {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: JSON.stringify(err) });
    }
  }
);

module.exports = router;
