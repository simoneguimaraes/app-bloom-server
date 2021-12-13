module.exports = (req, res, next) => {
    if (req.user.role === "PATIENT") {
      return next();
    } else {
      return res.status(401).json({ msg: "You do not have permission to this." });
    }
};