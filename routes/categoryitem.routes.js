module.exports = app => {
    const categoryitems = require("../controllers/categoryitem.controller.js");
    var upload = require('../multer/upload');
  
    var router = require("express").Router();
  
    // Create a new Category Item
    router.post("/",upload.single('image'),categoryitems.create);
  
    // Retrieve all Category Items
    router.get("/", categoryitems.findAll);

    router.get("/category/:categoryId", categoryitems.findByCategory);
  
    // Retrieve a single Category Item with id
    router.get("/:id", categoryitems.findOne);
  
    // Update a Category Item with id
    router.put("/:id",upload.single('image'), categoryitems.update);
  
    // Delete a Category Item with id
    router.delete("/:id", categoryitems.delete);
  
    // Delete all Category Items
    router.delete("/", categoryitems.deleteAll);
  
    app.use('/categoryitems', router);
  };