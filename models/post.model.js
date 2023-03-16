module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        location: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        likes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

    });
    

    return Post;
};