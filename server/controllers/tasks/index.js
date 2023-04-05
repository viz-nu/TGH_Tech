


import express from "express";
import authMiddleware from "../../middlewares/auth.js"
import config from "config"
import userModel from "../../models/userModel.js"
const { JWT } = config.get("SECRET_KEYS")

const taskRouter = express.Router()

//Add api

taskRouter.post('/add', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        user.tasks.push(req.body)
        await user.save()
        res.status(200).json({ message: "task added successfully" });
    } catch (error) {
        res.status(500);
        console.log("error while adding task");
        console.log(error);
        throw new Error("Failed to create user due to internal Server error")
    }
});

//cancel api

taskRouter.post('/cancel', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        user.tasks = user.tasks.map(ele => {
            if (ele._id == req.body.id)  ele.isCancelled = !ele.isCancelled
            return ele
        })
        await user.save()
        res.status(200).json({ message: "task status changed" })
    } catch (error) {
        res.status(500);
        console.log("error while cancelling task");
        console.log(error);
    }
});
//completed api
taskRouter.post('/completed', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        user.tasks=user.tasks.map(ele=>{
            if(ele._id==req.body.id){
                ele.isCompleted = !ele.isCompleted
            }
            return ele
        })
        await user.save()
        res.status(200).json({ message: "task status changed" })
    } catch (error) {
        res.status(500);
        console.log("error while marking completed task");
        console.log(error);
    }
});
//delete api
taskRouter.post('/delete', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email })
        user.tasks = user.tasks.filter((ele) => ele._id != req.body.id)
        await user.save()
        res.status(200).json({ message: "task Deleted" })
    } catch (error) {
        res.status(500);
        console.log("error while removing task");
        console.log(error);
    }
});

export default taskRouter