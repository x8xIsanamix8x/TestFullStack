const { Router } = require("express");
const { createUser, loginUser } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router()

//? Create User
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('lName', 'Last name is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(), // Asegúrate de que la validación sea la correcta
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({ min: 6 }),
    validateFields
], createUser );

//? Login User
router.post('/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ], loginUser
)


module.exports = router;