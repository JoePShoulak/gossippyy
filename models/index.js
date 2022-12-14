const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Follow = require("./Follow");

User.belongsToMany(User, {
  through: Follow,
  as: "following",
  foreignKey: "follower_id",
});

User.belongsToMany(User, {
  through: Follow,
  as: "follower",
  foreignKey: "following_id",
});

// a User has many Posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// a User has many Comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// a Post belongs to a User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// a Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// a Post has many Comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// A Comment belongs to a Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment, Follow };
