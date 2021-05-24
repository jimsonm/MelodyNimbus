'use strict';
module.exports = (sequelize, DataTypes) => {
  const Track_Comment = sequelize.define('Track_Comment', {
    track_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    response_text: DataTypes.TEXT
  }, {});
  Track_Comment.associate = function(models) {
    // associations can be defined here
    Track_Comment.belongsTo(models.User, { foreignKey: 'user_id' })
    Track_Comment.belongsTo(models.Track, { foreignKey: 'track_id' })
  };
  return Track_Comment;
};