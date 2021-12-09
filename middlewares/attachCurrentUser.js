const UserModel = require("../models/User.model");
const PatientProfileModel = require("../models/PatientProfile.model");
const DoctorProfileModel = require("../models/DoctorProfile.model");

module.exports = async (req, res, next) => {
  try {
    // Ver linha 14 do arquivo isAuthenticated.js
    const loggedInUser = req.user;

    const user = await UserModel.findOne(
      { _id: loggedInUser._id },
      { passwordHash: 0, __v: 0 } // Excluindo o hash da senha da resposta que vai pro servidor, por segurança
    );

    if (!user) {
      // 400 significa Bad Request
      return res.status(400).json({ msg: "User does not exist." });
    }

    if (user.role === "DOCTOR") {
      const doctorUser = await DoctorProfileModel.findOne(
        { userId: loggedInUser._id },
        { passwordHash: 0, __v: 0 }
      );

      req.currentUser = [doctorUser, user];
    } else {
      const patientUser = await PatientProfileModel.findOne(
        { userId: loggedInUser._id },
        { passwordHash: 0, __v: 0 }
      );

      req.currentUser = [patientUser, user];
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
