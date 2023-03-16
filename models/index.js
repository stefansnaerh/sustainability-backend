const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.categoryitems = require("./categoryitem.model.js")(sequelize, Sequelize);

// One Category is in many Posts but one Post only has 1 Category.
db.categories.hasMany(db.posts);
db.posts.belongsTo(db.categories);

// One user can Post many posts but each post is only for 1 specific User.
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

// One Category has many Category Items, but only one specific Category Item belongs to one Category
db.categories.hasMany(db.categoryitems);
db.categoryitems.belongsTo(db.categories);

// One Category Item has many Posts, but only one specific Post belongs to one Category Item
db.categoryitems.hasMany(db.posts);
db.posts.belongsTo(db.categoryitems);

// One Category Item can be used by many Users, but only one specific User can put one Category Item.

module.exports = db;