// import dotenv from 'dotenv'
const dotenv = require("dotenv").config();
const colors = require('colors')
const morgan = require('morgan');
// dotenv.config()
const express = require('express');
const userCollection = require('./models/user.js');
const connectDB = require('./db.js');
// import { hashPassord } from './helper/authHelper.js';
const path = require('path');
const cors = require('cors')
const authroutes = require('./routes/authRoute.js')
const port = process.env.PORT || 3000
const app = express();


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(morgan('dev'))


app.use(express.static(path.join(__dirname, './frontend/build')))
app.use("/api/v1/auth", authroutes)
// const createUser = async () => {
//     try {
//         const result = new userCollection({
//             name: "Vipul",
//             email: "vipul@gmai.com",
//             password: "12213",
//             phone: 827293123
//         })

//         const data = await result.save();
//         console.log(data)
//     }
//     catch (e) {
//         console.log(e)
//     }
// }

// createUser();
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})
// app.get("/", (req, res) => {
//     res.send("Hello E Commerce MERN APP!")
// })
connectDB();

app.listen(port, () => {
    console.log(`Server is runnig at ${port}`)
})