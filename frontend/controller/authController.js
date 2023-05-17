const userCollection = require("../models/user");
const helper = require('../helper/authHelper')
const bcrypt = require('bcrypt');
const colors = require('colors')
const JWT = require('jsonwebtoken')

const { Collection } = require("mongoose");
const registerController = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const Newpassword = await helper.hashPassord(password);
        const result = new userCollection({
            name: req.body.name,
            email: req.body.email,
            password: Newpassword,
            phone: req.body.phone
        })

        const existingUser = await userCollection.findOne({ email: email })
        if (existingUser) {

            // res.status(400).send({
            //     success: false,
            //     message: "User Alreday Exits",
            //     data
            // });
            res.json({ success: false })
        }
        const data = await result.save();
        // res.status(201).send({
        //     success: true,
        //     message: "User Register Succesfully",
        //     data

        // });
        res.json({ success: true, user: req.body.name })
        // console.log(data)
    }
    catch (e) {
        console.log(e)
    }

}
const loginController = async (req, res) => {
    try {
        const email = req.body.email;
        // const name = req.body.name;
        const password = req.body.password;
        // const mydata={email,password};
        const user = await userCollection.findOne({ email })
        const match = await helper.comparePassword(password, user.password);
        // const data = {};

        if (!match) {
            res.status(401).send({
                message: "Login Failed!",
                success: false
            })
        }

        // token

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
        if (match) {

            res.status(200).send({
                message: "Login Successful hua",
                success: true,
                status: true,
                // user: req.body.email
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    role: user.role

                    // address: user.address,
                    // role: user.role,
                },
                token,
            });
            // res.json({ success: true, user: req.body.name})
            console.log("login Successful hua".green)
            console.log(match)
        }

        else {
            res.status(401).send(

                {
                    success: false,
                    message: "Invalid Details",
                    status: false

                }



            );
            // res.json({ success: false })
            // console.log("Invalid details".red)
            // console.log(res.success)

        }
    }
    catch (e) {
        console.log(e)
    }

}


const testController = (req, res) => {
    res.send("Procted route")
}
module.exports = { registerController, loginController, testController };
// export { registerController }