import { Router } from "express";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import userSchema from "../Models/Schemas/UserSchema.js";
import bcrypt from 'bcrypt';



const router = Router();

router.post('/register', async (req, res) => {
    let data = req.body;
    try {
        let newUser = new userModel({
            firstname: data['firstname'],
            lastname: data['lastname'],
            phnumber: data['phnumber'],
            email: data['email'],
            username: data['username'],
            password: data['password']
        })
        await newUser.save();
        let payload = JSON.parse(JSON.stringify(newUser))
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        res.json({ token })
    } catch (err) {
        res.status(401).json({msg:'User cannot be created',name:'invalidUser'})
    }
})

router.post('/login', async (req, res) => {
    let data = req.body;
    try {
        let result = await userModel.findOne({ username: data['username'] })
        if(!result){
            res.status(401).json({ msg: 'User not found', name: 'username' })
        }
        const isMatch = await bcrypt.compare(data['password'], result.password);
        if(!isMatch) {
            res.status(401).json({msg:'Password is incorrect',name:'incorrectPassword'})
        }
        else{
            let payload = JSON.parse(JSON.stringify(result));
            let token = jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'1h'
            })
            res.json({token})
        }
    } catch (err) {
        res.status(401).json({msg:'Invalid username or password',name:'invalidData'})
    }
})

export default router;