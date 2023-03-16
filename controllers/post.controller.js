const db = require("../models");
const Post = db.posts;
const User = db.users;
const CategoryItem = db.categoryitems;
const Op = db.Sequelize.Op;
const fs = require('fs');
const imagePath = "public/images/"

// Create and Save a new Post
exports.create = async (req, res) => {
    console.log("req: ", req.body)
    // Validate request
    if (!req.body.location) {

        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Post
    const post = {
        location: req.body.location,
        image: req.file ? req.file.filename : "",
        userId: req.body.userId,
        categoryId: req.body.categoryId,
        categoryitemId: req.body.categoryitemId,
        action: req.body.action,
    };

    console.log(post)
    const categoryItem = await CategoryItem.findByPk(post.categoryitemId);
    console.log(categoryItem);
    const user = await User.findByPk(post.userId);
    console.log(user);

    const points = categoryItem.points + user.points;
    console.log(points);
    await user.update({ points });

    // Save Post in the database
    Post.create(post)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        });

};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;

    Post.findAll({
        where: condition,
        include: [{ model: User, attributes: ['username','image'] }, { model: CategoryItem, attributes: ['points','action'] }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Post with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Post with id=" + id
            });
        });
};

exports.findByUser = (req, res) => {
    const userId = req.params.userId;
  
    Post.findAll({ where: {userId: userId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Posts."
        });
      });
  };

// Update a Post by the id in the request
exports.update = (req, res) => {


    const id = req.params.id;
    var filename = '';

    Post.findByPk(id).then(data => {
        filename = data.image

        const post = {
            location: req.body.location,
            image: req.file ? req.file.filename : filename,
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            categoryitemId: req.body.categoryitemId
        };

        Post.update(post, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    if (req.file && (filename != "")) {
                        fs.unlinkSync(imagePath + filename)
                    }
                    res.send({
                        message: "Post was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Post with id=" + id
                });
            });

    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Post with id=" + id
            });
        });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    var filename = '';

    Post.findByPk(id).then(data => {
        filename = data.image
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });

    Post.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                fs.unlinkSync(imagePath + filename)
                res.send({
                    message: "Post was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {

    Post.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Posts were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Posts."
            });
        });
};

// Find all published users
exports.findAllPublished = (req, res) => {

};