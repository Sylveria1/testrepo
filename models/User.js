const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role'); // Import Role model

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telephonenumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userRole: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    membership_status: {
        type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
        defaultValue: 'Bronze'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true,
    underscored: true
});

// Define relationship with Role
User.belongsTo(Role, { foreignKey: 'roleId', as: 'roleAssociation' });

module.exports = User;
