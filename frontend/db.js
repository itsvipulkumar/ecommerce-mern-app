// import dotenv from 'dotenv'
const dotenv = require("dotenv").config();
const colors = require('colors')
// import colors from 'colors'
// dotenv.config()
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.DB);
        console.log(`Database Connection Successful`.green)
    }
    catch (e) {
        console.log(`Error in Mongo`.bgRed.white)
    }
}

module.exports = connectDB