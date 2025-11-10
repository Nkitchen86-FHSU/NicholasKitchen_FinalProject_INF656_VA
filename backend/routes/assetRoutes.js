import express from "express";
import Asset from "../models/Asset.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, async(req, res) => res.json(await Asset.find()));
router.post("/", verifyToken, async(req, res) => res.json(await Asset.create(req.body)));
router.put("/:id", verifyToken, async(req, res) => res.json(await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", verifyToken, async(req, res) => { await Asset.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); });

export default router;