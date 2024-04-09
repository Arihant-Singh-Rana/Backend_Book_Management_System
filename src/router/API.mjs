import express from "express";
import { AddData, DeleteData, ReadData, UpdateData } from "../controller/API_Functions.mjs";

const router = express.Router();

router.get("/api/books",ReadData);
router.post("/api/books/add", AddData);
router.put("/api/books/update/:id", UpdateData);
router.delete("/api/books/delete/:id", DeleteData);

export default router;