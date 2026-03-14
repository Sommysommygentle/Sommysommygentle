const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'comments',
  timestamps: true
});

module.exports = Comment;
