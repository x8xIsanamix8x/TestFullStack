const Evaluations = require("../models/Evaluations");

const createEvaluation = async (req, res = response) => {
  
    try {
      const evaluation = new Evaluations(req.body);
  
      await evaluation.save();
  
      console.log('Evaluación guardada, enviando respuesta');
      res.status(201).json({
        ok: true,
        evaluation: {
          id: evaluation.id,
          employeeId: evaluation.employeeId,
          evaluatorId: evaluation.evaluatorId,
          date: evaluation.date,
          nameEvaluation: evaluation.nameEvaluation,
          score: evaluation.score,
          commets: evaluation.commets,
          status: evaluation.status
        }
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator'
      });
    }
};

const getEvaluation = async(req, res = response) => {
    const evaluationId = req.params.id;
  
    try {
      const evaluation = await Evaluations.findById(evaluationId);
  
      if (!evaluation) {
        return res.status(404).json({
          ok: false,
          msg: 'Evaluation not found'
        });
      }
  
      const evaluationObj = evaluation.toObject();
      evaluationObj.id = evaluationObj._id.toString();
  
      res.status(200).json({
        ok: true,
        evaluation: evaluationObj
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator'
      });
    }
};

const getEvaluations = async (req, res = response) => {

  try {
    
     const allEvaluations = await Evaluations.find({});
    
    res.status(200).json({
      ok: true,
      evaluations: allEvaluations
    });

  } catch (error) {
    console.error("Error en getEvaluations:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Please talk to the administrator'
    });
  }

};



const updateEvaluation = async (req, res = response) => {
    const evaluationId = req.params.id;
  
    try {
      const evaluationFound = await Evaluations.findOne({ _id: evaluationId });
      if (!evaluationFound) {
        return res.status(404).json({
          ok: false,
          msg: 'Evaluation not found'
        });
      }
  
      const { employeeId, evaluatorId, ...nuevaData } = req.body;
  
      const evaluationUpdated = await Evaluations.findByIdAndUpdate(
        evaluationId,
        nuevaData,
        { new: true }
      );
  
      const evaluationObj = evaluationUpdated.toObject();
      evaluationObj.id = evaluationObj._id.toString();
  
      res.status(200).json({
        ok: true,
        evaluation: evaluationObj
      });
    } catch (error) {

      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Please talk to the administrator'
      });

    }
};

const getEvaluationsByEmployee = async (req, res) => {

    const employeeId = req.params.id;
  
    try {
      
      const evaluations = await Evaluations.find({ employeeId });
  
      if (!evaluations || evaluations.length === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'No evaluations found for this employee'
        });
      }
  
      res.status(200).json({
        ok: true,
        evaluations
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
    createEvaluation,
    getEvaluation,
    updateEvaluation,
    getEvaluationsByEmployee,
    getEvaluations
}