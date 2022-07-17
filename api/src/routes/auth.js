const { requireSignin } = require("../common-middlewere");
const { signup, signin } = require("../controller/auth.controller");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("./validators/auth");
const router = require("express").Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.get("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
