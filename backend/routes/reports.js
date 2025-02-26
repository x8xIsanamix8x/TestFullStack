const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-fields");
const { getEvaluationsByEmployeeWithFeedback } = require("../controllers/reports");

const router = Router()

router.get('/employee/:id', validateJWT, getEvaluationsByEmployeeWithFeedback)

module.exports = router;