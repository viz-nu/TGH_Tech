import express from "express";
import config from "config";
import "./dbConnect.js"
const app = express();
const port = config.get("Port")
app.get("/", (req, res) => { res.send('server up and running') });
app.listen(port, () => { console.log(`server running on port:${port}`); });