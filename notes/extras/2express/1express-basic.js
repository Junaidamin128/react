import * as dotenv from "dotenv";
import express from "express";

// //LOAD ENVIRONMENT VARIABLES
dotenv.config();
// const express = require("express");
const app = express();
const port = process.env.PORT;

//get body from req
app.use(express.json());

//get current user
app.use(function (req, res, next) {
  //
  req.user = null;
  if (false) {
    req.user = { name: "Moin" };
  }
  next();
});

//pata nahi
app.use(function (req, res, next) {
  console.log("2nd");
  next();
});

app.get("/", (req, res) => {});

app.post("/register", (req, res) => {
  res.json(req.body);
});

app.get("/node/:nid", (req, res) => {
  res.json(req.params);
});

app
  .route("/item/:id")
  .get((req, res) => {
    res.json({ title: "Hello" });
  })
  .post((req, res) => {
    res.status(403).json({ msg: "Invalid" });
  })
  .delete((req, res) => {
    res.status(501).json({ msg: "don't have permission" });
  });

//404
app.use((req, res, next) => {
  res.status(404).json({ msg: " Sorry " });
});

app.listen(port, function () {
  console.log(`Server listening on port http://localhost:${port}`);
});
