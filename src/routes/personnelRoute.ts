import express from "express";
import InputPersonnelController from "../controllers/InputPersonnelController";

const router = express.Router();

router.post("/inputFile", InputPersonnelController.inputMultiple);

export default router;
