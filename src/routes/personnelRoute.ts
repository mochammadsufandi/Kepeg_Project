import express from "express";
import InputPersonnelController from "../controllers/InputPersonnelController";
import { FilterController } from "../controllers/filterController";
import EditController from "../controllers/editController";
import DeleteController from "../controllers/deleteController";

const router = express.Router();

router.post("/inputFile", InputPersonnelController.inputMultiple);
router.get("/getByNIP", FilterController.filterNIPNRP);
router.get("/searchByName", FilterController.searchByName);
router.get("/dynamicFilter", FilterController.dynamicFilter);
router.post("/inputSingle", InputPersonnelController.inputSingle);
router.put("/edit", EditController.editPersonnel);
router.patch("/mark", DeleteController.marker);
router.delete("/delete", DeleteController.delete);

export default router;
