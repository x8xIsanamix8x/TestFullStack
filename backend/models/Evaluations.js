const { Schema, model } = require("mongoose");

const EvaluationsSchema =  Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    evaluatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    nameEvaluation: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    commets: {
        type: String
    },
    status: {
        type: String
    }
    
}, {
    timestamps: true,
})

module.exports = model('Evaluation', EvaluationsSchema);