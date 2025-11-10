import express from "express";
import Asset from "../models/Asset.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async(req, res) => res.json(await Asset.find()));
router.post("/", protect, async(req, res) => res.json(await Asset.create(req.body)));
router.put("/:id", protect, async(req, res) => res.json(await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete("/:id", protect, async(req, res) => { await Asset.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); });

export default router;