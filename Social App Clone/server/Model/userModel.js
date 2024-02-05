import * as dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userSchema from "./Schema/userSchema.js";

dotenv.config();

// Pre-save middleware to hash the password before saving
userSchema.pre('save', function (next) {
    let user = this;

    // Check if password is modified
    if (user.isModified('password')) {
        bcrypt.genSalt(+process.env.SWF, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});


// another way of Pre-save middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//     let user = this;

//     // Check if password is modified
//     if (user.isModified('password')) {
//         try {
//             // Hash the password using bcrypt
//             const saltRounds = +process.env.SWF; // Ensure this is the correct variable
//             const hashedPassword = await bcrypt.hash(user.password, saltRounds);

//             // Update the user's password with the hashed value
//             user.password = hashedPassword;

//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

// Method to compare passwords during authentication
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// another way of Method to compare passwords during authentication
// userSchema.methods.comparePassword = async function (candidatePassword, cb) {
//     try {
//         // Compare the candidate password with the hashed password using bcrypt
//         const isMatch = await bcrypt.compare(candidatePassword, this.password);

//         // Callback with the result
//         cb(null, isMatch);
//     } catch (error) {
//         // Handle errors
//         cb(error);
//     }
// };

// Create the user model using the user schema
const userModel = mongoose.model('user', userSchema);

// Export the user model
export default userModel;
