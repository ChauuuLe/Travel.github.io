const db = require("../models/index.js");
const ROLES = db.ROLES;
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.searchUsers = async (req, res) => {
    const searchTerm = req.query.q;
    try {
        const user = await User.findOne({ username: { $regex: searchTerm, $options: "i" } });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        } else {
            res.status(200).send({ message: "User found", user });
            return;
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
