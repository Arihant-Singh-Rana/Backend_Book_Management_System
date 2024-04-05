import express from "express";
import { AddData, ReadData } from "../controller/API_Functions.mjs";

const router = express.Router();

router.get("/api/books",ReadData);
router.post("/api/books/add", AddData);

export default router;