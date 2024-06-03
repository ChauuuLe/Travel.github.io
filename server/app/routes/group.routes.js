const { authJwt } = require("../middleware/index.js");
const groupController = require("../controllers/group.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/groups/create", [authJwt.verifyToken, authJwt.isAdmin], groupController.createGroup);

  app.get("/api/groups", [authJwt.verifyToken], groupController.getAllGroups);

  app.get("/api/groups/:id", [authJwt.verifyToken], groupController.getGroupById);

  app.put("/api/groups/:id", [authJwt.verifyToken, authJwt.isAdmin], groupController.updateGroup);

  app.delete("/api/groups/:id", [authJwt.verifyToken, authJwt.isAdmin], groupController.deleteGroup);
};
