import express from "express";
import { questRouter } from "./Routes/question.js";
import dotenv from "dotenv";
import cors from "cors";

import { isAuthorized } from "./Authorization/auth.js";
import { answRouter } from "./Routes/answer.js";
import { SigninRouter } from "./Routes/login.js";



//initiating sever
const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//env configuration
dotenv.config();

//initiating port 
const PORT = process.env.PORT

app.use("/ques", questRouter);
app.use("/answ", answRouter);
app.use("/user",SigninRouter);

//listening server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));





