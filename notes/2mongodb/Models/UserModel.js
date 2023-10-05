import mongoose from "mongoose";
import UserSchema from "../Schemas/UserSchema.js";

const userModel = mongoose.model("user", UserSchema);



export default userModel;