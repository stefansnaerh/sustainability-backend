module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CategoryItems', [{
      name: 'Muxgo',
      type:'Meals',
      image: 'muxgo.jpg',
      tags: 'Ingredients from its own farm. Ingredients from the island',
      categoryId: 1,
      points: 44,
      action: 'eating sustainably',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Llaollao',
      type:'Ice cream',
      image: 'llaollao.jpg',
      tags: 'No plastic. Their cups are 100% recycleable. Healthy',
      categoryId: 1,
      points: 22,
      action: 'eating sustainably',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bioloco',
      type:'Meals',
      image: 'bioloco.jpg',
      tags: 'Healthy. Tasty. 100% cruelty-free food. Vegan food',
      categoryId: 1,
      points: 28,
      action: 'eating sustainably',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Recycle furniture from your house',
      type:'Recycling',
      image: 'recyclingfurniture.jpg',
      tags: 'Clean house. Clean mind. 100% sustainable',
      categoryId: 2,
      points: 30,
      action: 'doing a sustainable activity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Participate in cleaning the beaches activities',
      type:'Cleaning',
      image: 'cleanbeach.jpeg',
      tags: 'Help sea animals. Recycle. Amazing experience ',
      categoryId: 2,
      points: 100,
      action: 'doing a sustainable activity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Buy something at your Local Farmers Market',
      type:'Buying Sustainable Food',
      image: 'buyingfruits.jpg',
      tags: 'Helps local people. Eating green. Boosts your health  ',
      categoryId: 2,
      points: 80,
      action: 'doing a sustainable activity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Caldera de Bandama',
      type:'Nature Place',
      image: 'caldera.jpg',
      tags: 'Nature. Almost no buildings. ',
      categoryId: 3,
      points: 50,
      action: 'going into a sustainable place',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Barranco del Draguillo',
      type:'Nature Place',
      image: 'barranco.jpeg',
      tags: 'Protected ravine. Declared a natural monument and area of ecological sensitivity',
      categoryId: 3,
      points: 60,
      action: 'going into a sustainable place',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Parque Rural de Doramas',
      type:'Nature Place',
      image: 'parque.jpg',
      tags: 'Protected mountainous area with mountains, ravines and volcanic cones',
      categoryId: 3,
      points: 80,
      action: 'going into a sustainable place',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CategoryItems', null, {});
  }
};