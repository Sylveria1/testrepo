const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Brand extends Model {}

Brand.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Brand',
  timestamps: true,
  underscored: true,
});

module.exports = Brand;
