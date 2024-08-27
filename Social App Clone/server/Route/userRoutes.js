import * as dotenv from "dotenv";
import { Router } from "express";
import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from'bcrypt';

dotenv.config();

// Create a new router
const userRouter = Router();


userRouter.get("/", async (req, res)=>{
    res.json({user: req.user});
})


// Route for user registration
userRouter.post("/register", async (req, res) => {
    console.log("\n\n\n\nreg req\n\n\n\n")
    let data = req.body;
    console.log(data)
    try {
        // Check if the username already exists
        const existingUser = await userModel.findOne({ username: data['username'] });
        if (existingUser) {
            console.log("check")
            return res.status(400).json({ msg: "Username already exists", name: "err msg" });
        }
        
        // // Check if the password already exists (assuming passwords should be unique)
        // const existingPassword = await userModel.findOne({ password: data['password'] });
        // if (existingPassword) {
            //     return res.status(400).json({ msg: "Password already exists", name: "registration" });
            // }
            
        // Create a new user
        console.log("data");
        const newUser = new userModel({
            firstname: data['firstname'],
            lastname: data['lastname'],
            username: data['username'],
            password: data['password'],
            email: data['email'],
            phonenumber: data['phone'],
        });
        console.log(newUser,    "new User");
        // Save the new user to the database
        await newUser.save();

        // Generate a token for the new user
        let payload = JSON.parse(JSON.stringify(newUser));
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        // Respond with the token
        res.status(200).json({ token });
    } catch (error) {
        // Handle errors during registration
        res.status(400).json({ msg: "Error during registration", name: "err msg" });
    }
});


userRouter.post('/login',async (req,res)=>{
    let data = req.body;
    try{
        let result = await userModel.findOne({username: data['username']});
        if(!result){
            res.status(401).json({msg:'user not found',name:'err msg'})
        }

        let isMatch = await bcrypt.compare(data['password'], result['password']);
        console.log(isMatch);
        if(!isMatch){
            res.status(401).json({msg:'password is incorrect',name:'err msg'})
        }
        else{
            let payload = JSON.parse(JSON.stringify(result));
            let token = jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'1h'
            });
            res.json({token});
        }

    }catch(err){
                res.status(500).json({msg:"email or password is incorrect",name:'err msg'})
    }
})

// Export the userRouter
export default userRouter;