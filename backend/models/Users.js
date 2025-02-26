const { Schema, model } = require("mongoose");

const UsersSchema =  Schema({
    name: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = model('User', UsersSchema);