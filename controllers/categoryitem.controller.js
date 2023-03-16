const db = require("../models");
const CategoryItem = db.categoryitems;
const Op = db.Sequelize.Op;
const fs = require('fs');
const imagePath = "public/images/"

// Create and Save a new Category Item
exports.create = (req, res) => {
    console.log("req: ", req.body)
    // Validate request
    if (!req.body.name) {

        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Category Item
    const categoryItem = {
        name: req.body.name,
        type: req.body.type,
        image: req.file ? req.file.filename : "",
        tags: req.body.tags,
        categoryId: req.body.categoryId,
        action: req.body.action,
        points: Math.floor(Math.random() * 101), // Genera un número aleatorio entre 0 y 100
    };

    // Save Category Item in the database
    CategoryItem.create(categoryItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category Item."
            });
        });

};

// Retrieve all Category Items from the database.
exports.findAll = (req, res) => {
    const categoryId = req.query.categoryId;
    var condition = categoryId ? { categoryId: { [Op.like]: `%${categoryId}%` } } : null;

    CategoryItem.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Category Items."
            });
        });
};

// Find a single Category Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    CategoryItem.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category Item with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category Item with id=" + id
            });
        });
};

exports.findByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
  
    CategoryItem.findAll({ where: {categoryId: categoryId} })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Category Items."
        });
      });
  };



// Update a Category Item by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;
    var filename = '';

    CategoryItem.findByPk(id).then(data => {
        filename = data.image

        const categoryItem = {
            name: req.body.name,
            type: req.body.type,
            image: req.file ? req.file.filename : filename,
            tags: req.body.tags,
            categoryId: req.body.categoryId
        };

        CategoryItem.update(categoryItem, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    if (req.file && (filename != "")) {
                        fs.unlinkSync(imagePath + filename)
                    }
                    res.send({
                        message: "Category Item was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Category Item with id=${id}. Maybe Category Item was not found or req.body is empty!`
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

// Delete a Category Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    var filename = '';

    CategoryItem.findByPk(id).then(data => {
      filename = data.image
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Category Item with id=" + id
        });
    });

    CategoryItem.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                fs.unlinkSync(imagePath + filename)
                res.send({
                    message: "Category Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category Item with id=${id}. Maybe Category Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category Item with id=" + id
            });
        });
};

// Delete all CategoryItems from the database.
exports.deleteAll = (req, res) => {

    CategoryItem.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Category Items were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Category Items."
            });
        });
};