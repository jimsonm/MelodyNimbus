'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tracks', [
      {
        track_name: 'Butter',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/BTS+Butter+Lyrics+(Color+Coded+Lyrics).mp3',
        description: "BTS's new hit single.",
        user_id: 2,
        cover_art: "https://i1.sndcdn.com/artworks-Mz8udpSRqzWpIRss-F7MRwA-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Dynamite',
        track_src: "https://melody-nimbus.s3-us-west-1.amazonaws.com/BTS+'Dynamite'+Lyrics+(%E1%84%87%E1%85%A1%E1%86%BC%E1%84%90%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A9%E1%84%82%E1%85%A7%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AB+Dynamite+%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1)+(Color+Coded+Lyrics).mp3",
        description: "BTS's first song fully recorded in English.",
        user_id: 2,
        cover_art: "https://i1.sndcdn.com/artworks-MpPe7huS1dSgoLMg-PaOlIQ-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Knocked Off',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Knocked+Off.mp3',
        description: "It's 2017 and I'm back and better than ever. Let's get this money with my new track. Produced by JP Soundz.",
        user_id: 3,
        cover_art: "https://i1.sndcdn.com/artworks-000210710179-jdknnp-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Harambo',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Harambo.mp3',
        description: "A single for everyone's favorite primate. Make some noise for this one and smash that like button! Produced by Vintage Beatz",
        user_id: 3,
        cover_art: "https://i1.sndcdn.com/artworks-000182340492-a0jm77-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Gurenge',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Gurenge.mp3',
        description: "The opening theme song for the anime series Demon Slayer: Kimetsu no Yaiba.",
        user_id: 4,
        cover_art: "https://i1.sndcdn.com/artworks-NP6F1BoU6Nbh-0-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Crossing Field',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/LiSA+-+Crossing+Field.mp3',
        description: "The opening theme song for the anime series Sword Art Online.",
        user_id: 4,
        cover_art: "https://i1.sndcdn.com/artworks-cYfxt97NTibH-0-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'Nice for What',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Drake+-+Nice+For+What+(Lyrics).mp3',
        description: "The song was awarded two ASCAP Awards including Top Rap Song, and was nominated for Best Rap Performance at the 61st Annual Grammy Awards.",
        user_id: 5,
        cover_art: "https://i1.sndcdn.com/artworks-7O5fMo0TlehM-0-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: 'One Dance',
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Drake+-+One+Dance+(Lyrics).mp3',
        description: "One Dance is a song by Canadian rapper Drake from his fourth studio album Views (2016). It features guest vocals from Nigerian afrobeats artist WizKid and British singer Kyla.",
        user_id: 5,
        cover_art: "https://i1.sndcdn.com/artworks-IN7P6JliFdyY-0-t500x500.jpg",
        plays: 0,
      },
      {
        track_name: "thank u, next",
        track_src: 'https://melody-nimbus.s3-us-west-1.amazonaws.com/Ariana+Grande+-+thank+u%2C+next+(Lyrics).mp3',
        description: "Thank U, Next is the fifth studio album by American singer Ariana Grande, released on February 8, 2019, by Republic Records.",
        user_id: 6,
        cover_art: "https://i1.sndcdn.com/artworks-000444879936-0t14h9-t500x500.jpg",
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
