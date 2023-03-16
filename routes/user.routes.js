module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var upload = require('../multer/upload');
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/",upload.single('image'),users.create);

    // Log In a User
    router.post("/signin", auth.signin);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve all published Users
    router.get("/topten", users.topTen);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id",upload.single('image'), users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete all Users
    router.delete("/", users.deleteAll);
  
    app.use('/users', router);
  };