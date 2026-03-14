const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
    validate: {
      len: [3, 30],
      isAlphanumeric: true
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100]
    }
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: 'default-avatar.png'
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isPrivate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  followersCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  followingCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  postsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
