import express from "express";
import InputPersonnelController from "../controllers/InputPersonnelController";
import { FilterController } from "../controllers/filterController";

const router = express.Router();

router.post("/inputFile", InputPersonnelController.inputMultiple);
router.get("/getByNIP", FilterController.filterNIPNRP);
router.get("/searchByName", FilterController.searchByName);
router.get("/dynamicFilter", FilterController.dynamicFilter);

export default router;
