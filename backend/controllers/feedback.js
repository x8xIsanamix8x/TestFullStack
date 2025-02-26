const Feedbacks = require("../models/Feedbacks");

const createFeedback = async (req, res = response) => {
   
    const { userId, evaluationId, comment } = req.body;
  
    try {

      const newComment = new Feedbacks({
        userId,
        evaluationId,
        comment,
      });
  
      await newComment.save();
  
      res.status(201).json({
        ok: true,
        comment: newComment
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
    createFeedback,
}