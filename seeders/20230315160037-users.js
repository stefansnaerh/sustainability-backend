const  bcrypt  =  require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Johan1122',
      email: 'Johan@gmail.com',
      password: bcrypt.hashSync('3094u23094A'),
      birthdate: '1990-01-01',
      image: 'user1.jpg',
      points: 77,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Katrine333',
      email: 'Katrine@gmail.com',
      password: bcrypt.hashSync('2343656ffAA'),
      birthdate: '1999-01-01',
      image: 'user2.jpg',
      points: 320,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Philip6666',
      email: 'Philip@gmail.com',
      password: bcrypt.hashSync('egniogiegjAAA22'),
      birthdate: '1998-03-04',
      image: 'user3.jpg',
      points: 99,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Stefan1122',
      email: 'Stefan@gmail.com',
      password: bcrypt.hashSync('ergijtroihjt000dA'),
      birthdate: '2003-05-01',
      image: 'user4.jpg',
      points: 110,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
