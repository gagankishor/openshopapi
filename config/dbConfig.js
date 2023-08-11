const mysql = require('mysql2');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('gagan', 'root', 'postman@1A', {
  host: 'localhost',
  dialect: 'mysql',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  // sequelize.sync({ force: true })
  // .then(() => {
  //   console.log('Tables created successfully.');
  // })
  // .catch((error) => {
  //   console.error('Error creating tables:', error);
  // });
module.exports = sequelize ;
