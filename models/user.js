const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,

    },
    role: {
        type: Number,
        default: 0
    },

}, { timestamps: true }
)

const userCollection = new mongoose.model("user", userSchema)

module.exports = userCollection