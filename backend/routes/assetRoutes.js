import express from "express";
import Asset from "../models/Asset.js";
import { authorizeRoles, verifyToken } from "../middleware/auth.js";
import { createAsset, deleteAsset, getAssets, updateAsset } from "../controllers/assetController.js";

const router = express.Router();

router.get("/", verifyToken, getAssets);
router.post("/", verifyToken, authorizeRoles("admin", "tech"), createAsset);
router.put("/:id", verifyToken, authorizeRoles("admin", "tech"), updateAsset);
router.delete("/:id", verifyToken, authorizeRoles("admin", "tech"), deleteAsset);

export default router;