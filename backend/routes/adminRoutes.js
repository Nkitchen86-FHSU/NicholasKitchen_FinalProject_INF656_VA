import express from "express";
import { authorizeRoles, verifyToken } from "../middleware/auth";
import User from "../models/User";


const router = express.Router();

router.get("/users", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/user", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!["user", "tech"].includes(role)) {
            return res.status(400).json({ message: "Admins can only create techs or users" });
        }

        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/user/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;