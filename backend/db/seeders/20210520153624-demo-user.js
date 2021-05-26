'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        display_name: 'Demo User',
        avatar_img: '',
        header_img: '',
        first_name: '',
        last_name: '',
        city: '',
        country: '',
        bio: '',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        display_name: 'FakeUser1',
        avatar_img: faker.image.avatar(),
        header_img: faker.random.image(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'FakeUser2',
        avatar_img: faker.image.avatar(),
        header_img: faker.random.image(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'FakeUser3',
        avatar_img: faker.image.avatar(),
        header_img: faker.random.image(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'FakeUser4',
        avatar_img: faker.image.avatar(),
        header_img: faker.random.image(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'FakeUser5',
        avatar_img: faker.image.avatar(),
        header_img: faker.random.image(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null
      // display_name: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    , {});
  }
};