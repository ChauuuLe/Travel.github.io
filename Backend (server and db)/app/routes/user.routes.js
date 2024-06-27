const { authJwt } = require("../middlewares/index.js");
const controller = require("../controllers/user.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get(
    "/api/users/search-user",
    controller.searchUsers
  );

  app.get(
    "/api/users/current",
    controller.getCurrentUser
  );
};

exports.getCurrentUser = async (req, res) => {
  try {
    const isVerified = await authJwt.verifyToken(req);
    if (!isVerified) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const user = await authJwt.getUserDetails(req);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name),
      avatar: user.avatar,
      blocked: user.blocked,
      userChats: user.userChats,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};