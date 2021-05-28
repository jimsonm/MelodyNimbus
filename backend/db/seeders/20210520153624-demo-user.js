'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        display_name: 'Demo User',
        avatar_img: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/1622193099333.png',
        header_img: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/1622193556809.png',
        first_name: 'Demo',
        last_name: 'User',
        city: '',
        country: '',
        bio: '',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        display_name: 'BTS',
        avatar_img: "https://i1.sndcdn.com/avatars-000205359015-hyo5wq-t500x500.jpg",
        header_img: faker.random.image(),
        first_name: 'BTS',
        last_name: '',
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'WulfStrange',
        avatar_img: "https://i1.sndcdn.com/avatars-000241766442-b8l88w-t500x500.jpg",
        header_img: faker.random.image(),
        first_name: 'Peter',
        last_name: 'Wu',
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'LiSA',
        avatar_img: "https://alchetron.com/cdn/lisa-japanese-musician-born-1987-77c84231-298a-41d4-91b1-0ac018a9715-resize-750.jpeg",
        header_img: faker.random.image(),
        first_name: 'Risa',
        last_name: 'Oribe',
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'Drake',
        avatar_img: "https://i1.sndcdn.com/avatars-000509879598-4l3hzi-t500x500.jpg",
        header_img: faker.random.image(),
        first_name: 'Aubrey',
        last_name: 'Graham',
        city: faker.address.city(),
        country: faker.address.country(),
        bio: '',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        display_name: 'Ariana Grande',
        avatar_img: "https://i1.sndcdn.com/avatars-nM3Jj7GhV67HUcau-m00OHQ-t500x500.jpg",
        header_img: faker.random.image(),
        first_name: 'Ariana',
        last_name: 'Grande-Butera',
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