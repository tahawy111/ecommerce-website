const { initialData } = require("../../controller/admin/initialData");

const router = require("express").Router();

router.get("/initialdata/:token", initialData);

module.exports = router;
