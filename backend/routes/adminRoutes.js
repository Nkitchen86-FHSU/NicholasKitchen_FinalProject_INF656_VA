import express from "express";
import { isAdmin, verifyToken } from "../middleware/auth";
import User from "../models/User";


const router = express.Router();

router.get("/users", verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/user", verifyToken, isAdmin, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/user", verifyToken, isAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;