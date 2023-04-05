


import express from "express";
import authMiddleware from "../../middlewares/auth.js"
import config from "config"
import userModel from "../../models/userModel.js"
const { JWT } = config.get("SECRET_KEYS")

const taskRouter = express.Router()

// ADD /add
// req.body : {
//     taskname: 'test',
//         priority: 9,
//             isCompleted: false,
//                 isCancelled: false
// }
// user ={
//     _id: new ObjectId("642d41823c70f850fe00a547"),
//         name: 'Guest',
//             email: 'guest@example.com',
//                 password: '$2b$12$MMDvWUpd6fn/qr7.wAGWW.ukH/vRYE3zFeqhOfm/0Qgd9YGnKy4cu',
//                     tasks: [],
//                         createdAt: 2023 - 04 - 05T09: 38: 10.746Z,
//                             updatedAt: 2023 - 04 - 05T09: 38: 10.746Z,
//                                 __v: 0
// }
// req.user : {
//     _id: '642d41823c70f850fe00a547',
//         name: 'Guest',
//             email: 'guest@example.com',
//                 iat: 1680697242,
//                     exp: 1680700842
// }


taskRouter.post('/add', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.user.email})
        user.tasks.push(req.body)
        await user.save()
        console.log(user);
        res.status(200).json({message:"task added successfully"});
    } catch (error) {
        res.status(500);
        console.log("error while adding task");
        console.log(error);
        throw new Error("Failed to create user due to internal Server error")
    }
});

//



taskRouter.post('/cancel', async (req, res) => {
    try {


    } catch (error) {
        res.status(500);
        console.log("error while cancelling task");
        console.log(error);
        throw new Error("User failed to login  due to internal Server error")
    }
});
taskRouter.post('/completed', async (req, res) => {
    try {

    } catch (error) {
        res.status(500);
        console.log("error while marking completed task");
        console.log(error);
        throw new Error("User failed to login  due to internal Server error")
    }
});
taskRouter.post('/delete', async (req, res) => {
    try {

    } catch (error) {
        res.status(500);
        console.log("error while removing task");
        console.log(error);
        throw new Error("User failed to login  due to internal Server error")
    }
});

export default taskRouter