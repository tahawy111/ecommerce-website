const { requireSignin } = require('../common-middlewere');
const { signup, signin } = require('../controller/auth.controller');
const router = require('express').Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', requireSignin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
