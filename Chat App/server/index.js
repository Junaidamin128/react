import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./Router/userRouter.js";
import chalk from "chalk";
import cors from "cors";
import { addUserToRequest } from "./middleware/userMiddleware.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(addUserToRequest);



app.use("/user",userRouter);

const port = process.env.PORT || 5000;

const start = async ()=>{
    await mongoose.connect(process.env.DB_URL)
    console.clear();
    console.log("DB Connected");
    app.listen(port,()=>console.log(chalk.black.bgGreen(`\b\b\b\b\b\b server is connected at port ${port}${"\n".repeat(10)}`)));
}


start();

