// const { requireSignin } = require("../common-middlewere");
const { signup, signin } = require("../controller/auth.controller");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("./validators/auth");
const router = require("express").Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
// router.post("/signout", requireSignin, signout);

module.exports = router;
