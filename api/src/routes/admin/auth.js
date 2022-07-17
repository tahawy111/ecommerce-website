const { requireSignin } = require("../../common-middlewere");
const { signup, signin } = require("../../controller/admin/auth.controller");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const router = require("express").Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.get("/profile", requireSignin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
