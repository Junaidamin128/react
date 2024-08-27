import * as dotenv from "dotenv"
import mongoose from "mongoose"
import express from "express"
import chalk from "chalk";
import userRoute from './Routes/userRoute.js';
dotenv.config();

const app = express();



app.use(express.json());
app.use('/user',userRoute)




app.use((req,res)=>{
    res.status(404).json({msg:"Page Not found",name:"nofound"})
});

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({msg:"Broken",name:"broken"})
    }
});

let start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.clear()
        console.log('DB Connected');
        app.listen(process.env.PORT,()=>{
            console.log(chalk.black.bgWhite(`\b\b\b\b\b\b\bserver is connected at ${process.env.PORT}${"\n".repeat(10)} ${'='.repeat(50)}`))
        })
    }catch(err){
        console.log(chalk.white.bgRed(err.message))
        process.exit(1)
    }
}

start(); 
