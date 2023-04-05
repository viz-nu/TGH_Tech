


import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRegisterValidations, errorMiddleware, userLoginValidations } from "../../middlewares/validations.js"
import authMiddleware from "../../middlewares/auth.js"
import config from "config"
import userModel from "../../models/userModel.js"
const { JWT } = config.get("SECRET_KEYS")

const userRouter = express.Router()
// sending all user details to dashboard
userRouter.get('/auth', authMiddleware, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }

});

// Register
// { name: 'Viz', email: 'vishnuteg@gmail.com', password: 'Vishnu1808#' }

userRouter.post('/register', userRegisterValidations(), errorMiddleware, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: "Already Registered" });
        const userDetails = new userModel(req.body);
        userDetails.password = await bcrypt.hash(userDetails.password, 12);
        await userDetails.save();
        let token = jwt.sign({ _id: userDetails._id, name: userDetails.name, email: userDetails.email }, JWT, { expiresIn: "5h" })
        res.status(200).json({ success: "Welcome", token })
    } catch (error) {
        res.status(500);
        console.log("error in registration");
        console.log(error);
        throw new Error("Failed to create user due to internal Server error")
    }
});


// Login
// {
//     "email": "vishnu.teja101.vt@gmail.com",
//         "password": "fehtyd6y"
// }


userRouter.post('/login', userLoginValidations(), errorMiddleware, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "Oops! we dont find your details in our Database, Please do register" });
        if (!(await bcrypt.compare(req.body.password, user.password))) return res.status(400).json({ message: "invalid credintials. please try again" });
        let token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, JWT, { expiresIn: "1h" })
        res.status(200).json({ success: "Welcome", token })
    } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("User failed to login  due to internal Server error")
    }
});


export default userRouter