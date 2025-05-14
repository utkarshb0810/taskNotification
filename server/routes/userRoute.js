const express = require("express");
const User = require("../models/User.js");
const Notification = require("../models/Notification.js");

const router = express.Router();

// Create a user
router.post("/", async (req, res) => {
  const user = await User.create({ username: req.body.username });
  res.status(201).json(user);
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Use the User model to find all documents
    res.status(200).json(users); // Send the retrieved users as JSON with a 200 OK status
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" }); // Send an error response if something goes wrong
  }
});

// Follow another user
router.post('/:id/follow', async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.body.followerId);

  if (!userToFollow || !currentUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if already followed
  if (!userToFollow.followers.includes(currentUser._id)) {
    userToFollow.followers.push(currentUser._id);
    await userToFollow.save();

    currentUser.following.push(userToFollow._id); // <-- Important
    await currentUser.save();

    await Notification.create({
      userId: userToFollow._id,
      message: `${currentUser.username} followed you.`,
    });

    res.status(200).json({ message: 'Followed successfully' });
  } else {
    res.status(400).json({ message: 'Already following' });
  }
});

// Simulated Login/Signup using username
router.post('/login', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: 'Username required' });

  let user = await User.findOne({ username });
  if (!user) {
    user = await User.create({ username });
  }

  res.status(200).json(user); // send user info back
});

module.exports = router;
