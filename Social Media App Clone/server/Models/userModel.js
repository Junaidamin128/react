import mongoose from "mongoose";
import userSchema from "./Schemas/UserSchema.js";
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

// userSchema.virtual('password')
//     .set(function (passowrd) {
//         this._password = passowrd
//     })

userSchema.pre('save',function(next){
    let user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(+process.env.SWF,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err)
            user.password = hash;
        next();
        })
    })
})

userSchema.methods.comparePassword = function (candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
    })
}


let userModel = mongoose.model('user', userSchema)

export default userModel;