const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadhar_front: {
    type: DataTypes.STRING,
  },
  aadhar_back: {
    type: DataTypes.STRING,
  },
  pan_card: {
    type: DataTypes.STRING,
  },
  
}, {
  
});
// User.sync({  })
module.exports = User;
