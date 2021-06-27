'use strict';
// const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {  
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      },
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
    },
    avatar_img: {
      type: DataTypes.STRING,
    },
    header_img: {
      type: DataTypes.STRING, 
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: [
            'email',
            'hashedPassword',],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Track_Like, { foreignKey: 'user_id'});
    User.hasMany(models.Track_Comment, { foreignKey: 'user_id'});
    User.hasMany(models.Track, { foreignKey: 'user_id'});
  };
  
  User.prototype.toSafeObject = function () { // remember, this cannot be an arrow function
    const { id, email, avatar_img, header_img, first_name, last_name, city, country, bio, display_name } = this; // context will be the User instance
    return { id, email, avatar_img, header_img, first_name, last_name, city, country, bio, display_name };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.deleteCurrentUserById = async function (id) {
    return await User.destroy({
      where: {
        id
      }
    })
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
          email: credential,
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ avatar_img, email, display_name, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      avatar_img,
      email,
      display_name,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.edit = async function ({ avatar_img, header_img, display_name, image, first_name, last_name, city, country, bio, id }) {
    const user = await User.update({
      avatar_img,
      header_img,
      display_name,
      image,
      first_name,
      last_name,
      city,
      country,
      bio,
    }, { where: {
      id: id
    }});
    return await User.scope('currentUser').findByPk(id);
  }

  return User;
};