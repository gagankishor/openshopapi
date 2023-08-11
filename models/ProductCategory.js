const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const productCategory = sequelize.define('productCategory', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_cate_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  
}, {
  tableName: 'product_category',
  timestamps: true,
});
// productCategory.sync({ force: true })

module.exports = productCategory;
