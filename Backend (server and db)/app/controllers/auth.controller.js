const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.find({
        name: { $in: req.body.roles },
      }).exec();
      user.roles = roles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" }).exec();
      user.roles = [role._id];
    }

    await user.save();
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    })
      .populate("roles", "-__v")
      .exec();
    
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 7200, // 2 hours
    });

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    req.session.token = token;
    
    res.status(200).send({
      message: "Sign in successful",
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      token: token,  // Include token in the response
    });
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
