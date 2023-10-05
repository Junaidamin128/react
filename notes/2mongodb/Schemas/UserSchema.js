import mongoose from "mongoose";
let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

UserSchema.methods.sayHi = function () {
  console.log(`Hello ${this.name}`);
};

UserSchema.methods.validateLogin = function(username, password){
    
}

export default UserSchema;
