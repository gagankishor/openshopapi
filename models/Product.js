const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Product = sequelize.define('Product', {
  product_cate_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  product_price: {
    type: DataTypes.FLOAT, 
    allowNull: true,
  },
  product_img: {
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
  tableName: 'product',
  timestamps: true,
});
// Product.sync({ force: true })

module.exports = Product;
