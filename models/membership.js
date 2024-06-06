const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Membership = sequelize.define('Membership', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    min_purchases: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    max_purchases: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = Membership;
