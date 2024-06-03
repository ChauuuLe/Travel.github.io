const mongoose = require("mongoose");

const Group = mongoose.model(
    "Group",
    new mongoose.Schema({
        name: String,
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })
);

module.exports = Group;