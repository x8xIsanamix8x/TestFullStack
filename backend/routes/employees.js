const { Router } = require("express");
const { getUsers } = require("../controllers/employees");
const { validateJWT } = require("../middlewares/validate-fields");

const router = Router()

router.get('/', validateJWT, getUsers)

module.exports = router;