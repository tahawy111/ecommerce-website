const { requireSignin } = require("../../common-middlewere");
const {
  signup,
  signin,
  signout,
} = require("../../controller/admin/auth.controller");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../validators/auth");
const router = require("express").Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signout", signout);

module.exports = router;
