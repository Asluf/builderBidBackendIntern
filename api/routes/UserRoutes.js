module.exports = function(app) {

    const UserController = require("../controllers/UserController");
    app.get("/getUser", UserController.getUser);
   
};