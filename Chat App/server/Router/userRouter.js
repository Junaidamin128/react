import { Router, json } from "express";
import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const userRouter = Router();

userRouter.get('/', async (req, res) => {
    res.json({ user: req.user });
})
userRouter.post('/register', async (req, res) => {
    let data = req.body;
    try {
        const existingUser = await userModel.findOne({ username: data['username'] });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists", name: "err msg" });
        }
        const firstname = data['firstname']
        const lastname = data['lastname']
        const name = firstname + " " + lastname;
        console.log(name);
        const newUser = new userModel({
            name: name,
            username: data["username"],
            password: data['password'],
            email: data["email"],
        })
        await newUser.save()
        const payload = JSON.parse(JSON.stringify(newUser));
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1h"
        })


        // Respond with the token
        res.status(200).json({ token });

    } catch (err) {
        res.status(400).json({ msg: err, name: "err msg" });
    }
})

userRouter.post('/login', async (req, res) => {
    const user = req.body;
    try {
        const checkUser = await userModel.findOne({ username: user.username });
        if (!checkUser) {
            return res.status(400).json({ msg: 'No User Found', name: "err msg" })
        }
        const isMatch = await bcrypt.compare(user.password, checkUser.password)
        if (!isMatch) {
            res.status(401).json({ msg: 'password is incorrect', name: 'err msg' });
        }
        const payload = JSON.parse(JSON.stringify(checkUser))

        // delete payload.password
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ msg: err.message, name: 'err msg' })

    }

})

export default userRouter;