const sequelize = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Like = require('./Like');
const Comment = require('./Comment');
const Follow = require('./Follow');
const Story = require('./Story');
const Message = require('./Message');

// Define associations
User.hasMany(Post, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Like, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Post.hasMany(Like, { foreignKey: 'PostId', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'UserId' });
Like.belongsTo(Post, { foreignKey: 'PostId' });

User.hasMany(Comment, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Post.hasMany(Comment, { foreignKey: 'PostId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'UserId' });
Comment.belongsTo(Post, { foreignKey: 'PostId' });

// Follow relationships
User.belongsToMany(User, { 
  as: 'Followers', 
  through: Follow, 
  foreignKey: 'followingId',
  otherKey: 'followerId'
});

User.belongsToMany(User, { 
  as: 'Following', 
  through: Follow, 
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

User.hasMany(Story, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Story.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Message, { as: 'SentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });
Message.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });

module.exports = {
  sequelize,
  User,
  Post,
  Like,
  Comment,
  Follow,
  Story,
  Message
};
