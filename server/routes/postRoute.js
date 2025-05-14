const express = require("express");
const Post = require("../models/Post.js");
const User = require("../models/User.js");
const Notification = require("../models/Notification.js");

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
  const { userId, content } = req.body;

  const post = await Post.create({ userId, content });

  // Notify all followers
  const user = await User.findById(userId).populate("followers");
  for (const follower of user.followers) {
    await Notification.create({
      userId: follower._id,
      message: `${user.username} posted: "${content}"`,
    });
  }

  res.status(201).json(post);
});

module.exports = router;
