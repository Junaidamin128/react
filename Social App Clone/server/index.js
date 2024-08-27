import * as dotenv from "dotenv";
import express  from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import userRouter from "./Route/userRoutes.js";
import { addUserToRequest } from "./Middleware/auth.js";
import cors from "cors";

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(addUserToRequest);


app.use("/user", userRouter);

app.use((req,res)=>{
    res.status(404).json({msg:"Page not found",name:"404"})
});

app.use((err,req,res,next)=>{
    if(err){

        res.status(500).json({msg:"Server Error", name :"broken"})
    }
})

const start = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.clear();
    console.log('DB Connected');
    const port = process.env.PORT || 5000;
    app.listen(port, ()=>{
        console.log(chalk.black.bgGreen(`\b\b\b\b\b\b server is connected at port ${port}${"\n".repeat(10)}`));
    })
} 


start();