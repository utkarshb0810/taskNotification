const express =  require("express");
const Notification =  require("../models/Notification.js");

const router = express.Router();

// Get notifications for a user
router.get("/:userId", async (req, res) => {
  const notifications = await Notification.find({
    userId: req.params.userId,
  }).sort({ timestamp: -1 });
  res.json(notifications);
});

router.put("/:notifId/seen", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notifId,
      { seen: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Marked as seen", notification });
  } catch (error) {
    res.status(500).json({ message: "Error marking as seen", error });
  }
});

module.exports = router;
