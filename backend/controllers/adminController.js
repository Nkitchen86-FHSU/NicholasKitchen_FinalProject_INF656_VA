import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUser = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, role } = req.body;

        if (role && !["user", "tech", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found"});

        if (user.role === "admin" && req.user.role !== "admin") {
            return res.status(403).json({ message: "You cannot modify another admin" })
        }

        if (username) user.username = username;
        if (role) user.role = role;
        await user.save();

        res.json({ message: "User updated successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};