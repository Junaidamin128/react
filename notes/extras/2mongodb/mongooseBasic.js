import mongoose from "mongoose";
import UserModel from "./Models/UserModel.js";

const dbName = "mongojongo";

main().catch((err) => {
    console.log(err.name);
    console.log(err.message);
    mongoose.connection.close();

});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/" + dbName);

  //   let user = await UserModel.findOne({});
  //   console.log(user.sayHi());
  let user = new UserModel({name: "Osama", age: 10});
  await user.save();
  mongoose.connection.close();
}
