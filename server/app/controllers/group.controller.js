const db = require("../models/index.js");
const Group = db.group;
const User = db.user;

exports.createGroup = async (req, res) => {
  const { name, users } = req.body;

  try {
    // Create the group
    const group = new Group({ name, users });
    await group.save();

    // Update each user's groups array
    await Promise.all(
      users.map(async (userId) => {
        const user = await User.findById(userId);
        if (user) {
          user.groups = user.groups || [];
          user.groups.push(group._id);
          await user.save();
        }
      })
    );

    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('users', 'username email');
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('users', 'username email');
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { name, users } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (name) group.name = name;
    if (users) group.users = users;

    await group.save();

    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Remove the group from users' group lists
    await User.updateMany(
      { _id: { $in: group.users } },
      { $pull: { groups: group._id } }
    );

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
