import express from "express";
import { authorizeRoles, verifyToken } from "../middleware/auth";
import User from "../models/User";
import { createUser, deleteUser, getAllUsers } from "../controllers/adminController";


const router = express.Router();

router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers);

router.post("/user", verifyToken, authorizeRoles("admin"), createUser);

router.delete("/user/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;