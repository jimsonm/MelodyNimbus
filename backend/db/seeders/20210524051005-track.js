'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tracks', [
      {
        track_name: 'Gurenge',
        track_src: '',
        description: 'The opening for Demon Slayer: Kimetsu no Yaiba',
        user_id: 1,
        plays: 0,
      },
      {
        track_name: 'Dynamite',
        track_src: '',
        description: 'By BTS',
        user_id: 1,
        plays: 0,
      },
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tracks', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
