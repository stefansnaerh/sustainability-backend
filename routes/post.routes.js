module.exports = app => {
    const posts = require("../controllers/post.controller.js");
    var upload = require('../multer/upload');
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/",upload.single('image'),auth.isAuthenticated,posts.create);
    
  
    // Retrieve all Posts
    router.get("/", posts.findAll);
  
    // Retrieve all published Posts
    router.get("/users/:userId", posts.findByUser);
  
    // Retrieve a single Post with id
    router.get("/:id", posts.findOne);
  
    // Update a Post with id
    router.put("/:id",upload.single('image'), posts.update);
  
    // Delete a Post with id
    router.delete("/:id", posts.delete);
  
    // Delete all Posts
    router.delete("/", posts.deleteAll);
  
    app.use('/posts', router);
  };