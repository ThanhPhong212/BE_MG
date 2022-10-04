import express from "express";
import authController from "../controller/authController";

let router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
