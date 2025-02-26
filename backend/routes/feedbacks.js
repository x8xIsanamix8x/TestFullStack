const { Router } = require("express");
const { validateJWT, validateFields } = require("../middlewares/validate-fields");
const { createFeedback } = require("../controllers/feedback");
const { check } = require("express-validator");

const router = Router();

//? Create Feedback
router.post('/', [
    validateJWT, 
    check('userId', 'User Id is required').not().isEmpty(),
    check('evaluationId', 'Evaluation Id is required').not().isEmpty(),
    check('comment', 'Comment evaluation is required').not().isEmpty(),
    validateFields
  ], createFeedback);

module.exports = router;