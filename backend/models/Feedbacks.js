const { Schema, model } = require("mongoose");

const FeedbacksSchema =  Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    evaluationId: {
        type: Schema.Types.ObjectId,
        ref: 'Evaluation',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true,
})

module.exports = model('Feedback', FeedbacksSchema);