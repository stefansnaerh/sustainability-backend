module.exports = (sequelize, Sequelize) => {
    const CategoryItem = sequelize.define("categoryitem", {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(45),
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        tags: {
            type: Sequelize.STRING(100),
        },
        points: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        action: {
            type: Sequelize.STRING(100),
        },

    });


    return CategoryItem;
};