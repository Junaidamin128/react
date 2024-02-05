import mongoose from "mongoose";

// Function to validate if the given string is a valid email
function isEmail(v) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(v);
}

// Function to validate if the given value is a valid number
function isNumber(n) {
    let regex = /^\+?[0-9]\d{1,20}$/;
    return n && regex.test(n);
}

// Define the user schema
const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        lowercase: true,
        unique: true,       // Ensure uniqueness of usernames
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,       // Ensure uniqueness of emails
        validate: [isEmail, "Email is not correct"]
    },
    phonenumber: {
        type: Number,
        validate: [isNumber, "Number is not correct"]
    }
    // Add other fields as needed
});

// Export the user schema
export default userSchema;
