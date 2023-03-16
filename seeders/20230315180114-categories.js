module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [{
      name: 'Restaurants',
      image: 'categories1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Things to do',
      image: 'categories2.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Attractions',
      image: 'categories3.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};