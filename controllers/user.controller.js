const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');
const imagePath = "public/images/"
const utils = require("../utils");
const  bcrypt  =  require('bcryptjs');

// Create and Save a new User
exports.create = (req, res) => {
    console.log("req: ", req.body)
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.birthdate) {

        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        birthdate: req.body.birthdate,
        image: req.file ? req.file.filename : "",
    };

    User.findOne({ where: { username: user.username } })
    .then(data => {
      if (data) {
        const result = bcrypt.compareSync(user.password, data.password);
        if (!result) return res.status(401).send('Password not valid!');
        const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        // return the token along with user details
        return res.json({ user: userObj, access_token: token });
      }

      user.password = bcrypt.hashSync(req.body.password);

      // User not found. Save new User in the database
      User.create(user)
        .then(data => {
          const token = utils.generateToken(data);
          // get basic user details
          const userObj = utils.getCleanUser(data);
          // return the token along with user details
          return res.json({ user: userObj, access_token: token });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Retrieve all Users from the database.
exports.topTen = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    User.findAll({ 
        where: condition,
        order: [['points', 'DESC']],
        limit: 10
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;
    var filename = '';

    User.findByPk(id).then(data => {
            filename = data.image

            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                birthdate: req.body.birthdate,
                image: req.file ? req.file.filename : filename,
            }

            User.update(user, {
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        if (req.file && (filename != "")) {
                            fs.unlinkSync(imagePath + filename)
                        }
                        res.send({
                            message: "User was updated successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating User with id=" + id
                    });
                });

        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });

   
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    var filename = '';

    User.findByPk(id).then(data => {
      filename = data.image
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
    });

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                    fs.unlinkSync(imagePath + filename)
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};

// Find all published users
exports.findAllPublished = (req, res) => {

};