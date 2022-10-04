import express from "express";
import userController from "../controller/userController";
import middlewareController from "../controller/middlewareController";

let router = express.Router();

router.get("/", middlewareController.verifyToken, userController.getAllUser);
router.delete("/:id", middlewareController.verifyTokenAdmin, userController.deleteUser);

module.exports = router;
