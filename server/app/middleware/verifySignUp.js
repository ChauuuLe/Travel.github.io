const db = require("../models/index.js");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    console.log("Check Username or Email");
    // username
    const userUsername = await User.findOne({ username: req.body.username }).exec();
    if (userUsername) {
      res.status(400).send({ message: "Username already in use! Please use another username" });
      return;
    }

    // email
    const userEmail = await User.findOne({ email: req.body.email }).exec();
    if (userEmail) {
      res.status(400).send({ message: "Email already in use! Please use another email" });
      return;
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
    return;
  }
};

// password format
checkValidPasswordFormat = (req, res, next) => {
  const userPassword = req.body.password;
  const errors = [];

  if (!/\d/.test(userPassword)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[A-Z]/.test(userPassword)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(userPassword)) {
    errors.push("Password must contain at least one special symbol");
  }
  if (userPassword.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (errors.length > 0) {
    res.status(400).send({ message: "Invalid password format", message: errors });
    return;
  }

  next();
};

// role check
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkValidPasswordFormat,
  checkRolesExisted
};

module.exports = verifySignUp;
