import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";
import { initMySQLConnection } from "./database";


const app = express();
const port = process.env.PORT || 4000;;
app.use(bodyParser.json())

app.use(routes)

app.listen(port, async() => {
   await initMySQLConnection()
    console.log("Server is running port 40000");
});


export default app