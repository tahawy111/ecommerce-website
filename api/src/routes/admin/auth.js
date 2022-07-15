const { requireSignin } = require('../../common-middlewere');
const { signup, signin } = require('../../controller/admin/auth.controller');
const router = require('express').Router();

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.get('/profile', requireSignin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
