const { initialData } = require("../../controller/admin/initialData");

const router = require("express").Router();

router.get("/initialdata", initialData);

module.exports = router;
