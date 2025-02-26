const Evaluations = require("../models/Evaluations");
const Feedbacks = require("../models/Feedbacks");


const getEvaluationsByEmployeeWithFeedback = async (req, res = response) => {
  const employeeId = req.params.id;

  try {
    
    const evaluations = await Evaluations.find({ employeeId });

    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No evaluations found for this employee'
      });
    }

    
    const evaluationsWithFeedback = await Promise.all(
      evaluations.map(async (evaluation) => {
        const feedbacks = await Feedbacks.find({ evaluationId: evaluation._id });
        const evaluationObj = evaluation.toObject();
        evaluationObj.id = evaluationObj._id.toString();
        evaluationObj.feedbacks = feedbacks;
        return evaluationObj;
      })
    );

    res.status(200).json({
      ok: true,
      evaluations: evaluationsWithFeedback
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    });
  }
};

module.exports = {
  getEvaluationsByEmployeeWithFeedback
};
