'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track_Like = sequelize.define('Track_Like', {
    track_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Track_Like.associate = function(models) {
    // associations can be defined here
    Track_Like.belongsTo(models.User, { foreignKey: 'user_id' })
    Track_Like.belongsTo(models.Track, { foreignKey: 'track_id' })
  };
  return Track_Like;
};