import express from "express";
import { questRouter } from "./Routes/question.js";
import dotenv from "dotenv";
import { userRouter } from "./Routes/user.js";



//initiating sever
const app = express();

//middlewares
app.use(express.json());

//env configuration
dotenv.config();

//initiating port 
const PORT = process.env.PORT

app.use("/ques",questRouter);
app.use("/user",userRouter);

//listening server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));





