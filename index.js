import express from "express";
import { questRouter } from "./Routes/question.js";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./Routes/user.js";
import { isAuthorized } from "./Authorization/auth.js";



//initiating sever
const app = express();

//middlewares
app.use(express.json());
app.use(cors())

//env configuration
dotenv.config();

//initiating port 
const PORT = process.env.PORT

app.use("/ques",isAuthorized, questRouter);
app.use("/user",userRouter);

//listening server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));





