const Tournament = require('../models/Tournament');  
const User = require('../models/User');  
const Team = require('../models/Team');  
  
exports.createTournament = async (req, res) => {  
  try {  
    const tournament = new Tournament({  
      ...req.body,  
      createdBy: req.user._id  
    });  
      
    await tournament.save();  
      
    res.status(201).json({  
      success: true,  
      data: tournament  
    });  
  } catch (error) {  
    res.status(400).json({  
      success: false,  
      message: error.message  
    });  
  }  
};  
  
exports.getTournaments = async (req, res) => {  
  try {  
    const { game, status } = req.query;  
    const filter = {};  
      
    if (game) filter.game = game;  
    if (status) filter.status = status;  
      
    const tournaments = await Tournament.find(filter)  
      .populate('registeredTeams', 'teamName')  
      .sort({ startDate: 1 });  
      
    res.json({  
      success: true,  
      data: tournaments  
    });  
  } catch (error) {  
    res.status(400).json({  
      success: false,  
      message: error.message  
    });  
  }  
};  
  
exports.registerForTournament = async (req, res) => {  
  try {  
    const { tournamentId } = req.params;  
    const { teamId, playerIds } = req.body;  
      
    const tournament = await Tournament.findById(tournamentId);  
      
    if (!tournament) {  
      return res.status(404).json({  
        success: false,  
        message: 'Tournament not found'  
      });  
    }  
      
    if (new Date() > tournament.registrationDeadline) {  
      return res.status(400).json({  
        success: false,  
        message: 'Registration deadline has passed'  
      });  
    }  
      
    if (tournament.registeredTeams.length >= tournament.maxTeams) {  
      return res.status(400).json({  
        success: false,  
        message: 'Tournament is full'  
      });  
    }  
      
    const team = await Team.findById(teamId);  
      
    if (!team) {  
      return res.status(404).json({  
        success: false,  
        message: 'Team not found'  
      });  
    }  
      
    tournament.registeredTeams.push(teamId);  
    await tournament.save();  
      
    res.json({  
      success: true,  
      message: 'Successfully registered for tournament'  
    });  
  } catch (error) {  
    res.status(400).json({  
      success: false,  
      message: error.message  
    });  
  }  
};  
  
exports.updateTournamentStatus = async (req, res) => {  
  try {  
    const { tournamentId } = req.params;  
    const { status } = req.body;  
      
    const tournament = await Tournament.findByIdAndUpdate(  
      tournamentId,  
      { status },  
      { new: true }  
    );  
      
    res.json({  
      success: true,  
      data: tournament  
    });  
  } catch (error) {  
    res.status(400).json({  
      success: false,  
      message: error.message  
    });  
  }  
};  
  
exports.getTournamentResults = async (req, res) => {  
  try {  
    const { tournamentId } = req.params;  
      
     
  
???
