import express from "express";
import { authorizeRoles, verifyToken } from "../middleware/auth.js";
import { createUser, deleteUser, getAllUsers, updateUser } from "../controllers/adminController.js";


const router = express.Router();

router.get("/users", verifyToken, authorizeRoles("admin"), getAllUsers);
router.post("/user", verifyToken, authorizeRoles("admin"), createUser);
router.put("/user/:id", verifyToken, authorizeRoles("admin"), updateUser)
router.delete("/user/:id", verifyToken, authorizeRoles("admin"), deleteUser);

export default router;