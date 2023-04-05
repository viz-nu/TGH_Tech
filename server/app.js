import express from "express";
import config from "config";
import "./dbConnect.js";
import cors from "cors";
const app = express();
app.use(cors())
app.use(express.json());
import userRouter from "./controllers/user/index.js";
app.use("/api/user", userRouter);
import taskRouter from "./controllers/tasks/index.js";
app.use("/api/task", taskRouter);
const port = config.get("Port")
app.get("/", (req, res) => { res.send('server up and running') });
app.listen(port, () => { console.log(`server running on port:${port}`); });