import express from "express";
import personnalRoute from "./personnelRoute";

const router = express.Router();

router.use(personnalRoute);

export default router;
