const { createCategory } = require('../controller/category.controller');
const router = require('express').Router();

router.post('/category/create', createCategory);

module.exports = router;
