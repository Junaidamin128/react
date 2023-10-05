const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/new")
  .then(() => {

    mongoose.

    // app.listen(3000,()=>{
    //     console.log('on port 3000 !!!')
    // })
  })
  .catch((err) => {
    console.log(err);
  });
