'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define('Track', {
    track_name: DataTypes.STRING,
    track_src: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    cover_art: DataTypes.STRING,
    plays: DataTypes.INTEGER
  }, {});
  Track.associate = function(models) {
    // associations can be defined here
    Track.belongsTo(models.User, { foreignKey: 'user_id' })
    Track.hasMany(models.Track_Like, { foreignKey: 'track_id'});
    Track.hasMany(models.Track_Comment, { foreignKey: 'track_id'});
  };

  Track.getTrackById = async function (id) {
    return await Track.findByPk(id);
  };
  return Track;
};