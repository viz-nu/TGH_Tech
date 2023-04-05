import express from "express";
import config from "config";
import "./dbConnect.js";
import cors from "cors";
const app = express();
app.use(cors())

//...................deployement.......................
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



//....................................................

app.use(express.json());
import userRouter from "./controllers/user/index.js";
app.use("/api/user", userRouter);
import taskRouter from "./controllers/tasks/index.js";
app.use("/api/task", taskRouter);
const port = config.get("Port")
app.get("/", (req, res) => { res.send('server up and running') });
app.listen(port, () => { console.log(`server running on port:${port}`); });