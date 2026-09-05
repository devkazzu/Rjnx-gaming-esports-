const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prizePool: { type: Number, default: 0 },
  entryFee: { type: Number, default: 0 },
  slots: { type: Number, default: 0 },
  startTime: Date,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  results: [{
    teamName: String,
    position: Number,
    points: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model("Tournament", tournamentSchema);
