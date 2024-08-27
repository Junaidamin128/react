import * as dotenv from "dotenv";
import express from "express";
import node from "./Router/node.js";

// //LOAD ENVIRONMENT VARIABLES
dotenv.config();
// const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT;

app.use(express.json());

app.use("/node", node);
app.use("/junaid", (req, res) => {
  res.send.kotak();
});
app.use((err, req, res, next) => {
  res.status(500).send("Broken rib");
});
app.listen(port, function () {
  console.log(`Server listening on port http://localhost:${port}`);
});
