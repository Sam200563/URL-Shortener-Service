const User = require("../models/User");

const upgradePlan = async (req, res) => {

  try {
    const { userId, planType } = req.body;
    const durations = {
      Bronze: 30 * 24 * 60 * 60 * 1000,
      Silver: 90 * 24 * 60 * 60 * 1000,
      Gold: 365 * 24 * 60 * 60 * 1000,
    };
    if (!durations[planType]) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const now = new Date();
    const newExpiry = new Date(
      now.getTime() + durations[planType] * 24 * 60 * 60 * 1000
    );

    user.plan = planType;
    user.planExpiresAt = newExpiry;
    user.totalshortLinks = 0;
    console.log("Before upgrade:", user.totalshortLinks);
    await user.save();
    console.log("After upgrade:", user.totalshortLinks);

    res
      .status(200)
      .json({
        success: true,
        message: `Plan upgraded to ${planType}`,
        plan: user.plan,
        expiresAt: user.planExpiresAt,
      });
  } catch (error) {
    console.error("Upgrade plan error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { upgradePlan };
