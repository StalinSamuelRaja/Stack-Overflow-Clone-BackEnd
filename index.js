import express from "express";
import { questRouter } from "./Routes/question.js";

//initiating sever
const app = express();

//initiating port
const PORT = 9000;

//middlewares
app.use(express.json());

//listening server
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

app.use("/ques",questRouter);



