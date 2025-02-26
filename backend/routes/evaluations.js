const { Router } = require("express");
const { check } = require("express-validator");
const { createEvaluation, getEvaluation, updateEvaluation, getEvaluationsByEmployee, getEvaluations } = require("../controllers/evaluations");
const { validateFields, validateJWT } = require("../middlewares/validate-fields");

const router = Router();

//? Create Evaluation
router.post('/', [
  validateJWT, 
  check('employeeId', 'Employee Id is required').not().isEmpty(),
  check('evaluatorId', 'Evaluator Id is required').not().isEmpty(),
  check('date', 'Date is required').not().isEmpty(),
  check('nameEvaluation', 'Name evaluation is required').not().isEmpty(),
  check('score', 'Score is required and must be numeric').isNumeric(),
  validateFields
], createEvaluation);

//? View Evaluation
router.get('/evaluationsList', validateJWT, getEvaluations);
router.get('/:id', validateJWT, getEvaluation)

//? Update Evaluation
router.put('/:id', [
    validateJWT, 
    check('date', 'Date is required').not().isEmpty(),
    check('nameEvaluation', 'Name evaluation is required').not().isEmpty(),
    check('score', 'Score is required and must be numeric').isNumeric(),
    validateFields
  ], updateEvaluation);

//? View an specific evaluation of employee
router.get('/employee/:id', validateJWT, getEvaluationsByEmployee);

module.exports = router;
