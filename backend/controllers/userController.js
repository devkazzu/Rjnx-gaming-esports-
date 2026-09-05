const User = require("../models/User");

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.leaderboard = async (req, res) => {
  try { res.json(await User.find().select("username points").sort({ points: -1 }).limit(100)); }
  catch (error) { res.status(500).json({ message: error.message }); }
};
