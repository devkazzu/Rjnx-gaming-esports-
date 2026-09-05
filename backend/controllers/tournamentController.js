const Tournament = require("../models/Tournament");

exports.getTournaments = async (req, res) => {
  try { res.json(await Tournament.find().sort({ startTime: 1 })); }
  catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createTournament = async (req, res) => {
  try { res.status(201).json(await Tournament.create(req.body)); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

exports.register = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });
    if (!tournament.players.includes(req.user.id)) tournament.players.push(req.user.id);
    await tournament.save();
    res.json({ message: "Registered successfully" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getResults = async (req, res) => {
  try {
    const tournaments = await Tournament.find({ results: { $exists: true, $ne: [] } });
    const results = tournaments.flatMap(t => t.results || []);
    res.json(results);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
