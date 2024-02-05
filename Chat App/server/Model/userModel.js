// user.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from "dotenv";

dotenv.config();


const userSchema = new mongoose.Schema({
  name:{
    type : String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'user',
  }
},{
  timestamps: true,
});


// userSchema.pre('save', function (next) {
//   let user = this;

//   // Check if password is modified
//   if (user.isModified('password')) {
//       bcrypt.genSalt(+process.env.SWF, function (err, salt) {
//           if (err) return next(err);
//           bcrypt.hash(user.password, salt, function (err, hash) {
//               if (err) return next(err);
//               user.password = hash;
//               next();
//           });
//       });
//   } else {
//       next();
//   }
// });

// userSchema.methods.comparePassword = function(candidatePassword, cb){
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//     if(err) return cb(err)
//     cb(null, isMatch)
//   })
// }

userSchema.pre('save', async function (next) {
  let user = this;
  if (user.isModified('password')) {
    try {
      const hash = await bcrypt.hash(user.password, +process.env.SWF);
      user.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function(canPassword,cb){
  try{
    const isMatch = bcrypt.compare(canPassword,this.password)
    cb(null, isMatch)
  }catch(err){
    cb(err)
  }
}


const User = mongoose.model('User', userSchema);

export default User;