module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/",upload.single('image'), categories.create);
  
    // Retrieve all categories
    router.get("/", categories.findAll);
  
    // Retrieve all published categories
    router.get("/published", categories.findAllPublished);
  
    // Retrieve a single User with id
    router.get("/:id", categories.findOne);
  
    // Update a User with id
    router.put("/:id", categories.update);
  
    // Delete a User with id
    router.delete("/:id", categories.delete);
  
    // Delete all categories
    router.delete("/", categories.deleteAll);
  
    app.use('/categories', router);
  };