import express from "express";
import useAuth from "../Middle/authUser.js";
const router = express.Router();

//get body from req
router.get("/", (req, res) => {
  res.json(req.body);
});
router.get("/:id", (req, res) => {
  res.send("node data");
});
router.get("/:id/delete", useAuth, (req, res) => {
  res.send("delete");
});
router.get("/:id/edit", (req, res) => {
  res.send.kotak();
  res.send("delete");
});

export default router;
