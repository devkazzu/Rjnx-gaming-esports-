const mongoose = require('mongoose');  
  
const tournamentSchema = new mongoose.Schema({  
  name: {  
    type: String,  
    required: true  
  },  
  game: {  
    type: String,  
    required: true,  
    enum: ['BGMI', 'Free Fire', 'COD', 'Valorant']  
  },  
  entryFee: {  
    type: Number,  
    default: 0  
  },  
  prizePool: {  
    type: Number,  
    required: true  
  },  
  teamSize: {  
    type: String,  
    enum: ['Solo', 'Duo', 'Squad'],  
    required: true  
  },  
  maxTeams: {  
    type: Number,  
    required: true  
  },  
  registeredTeams: [{  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Team'  
  }],  
  status: {  
    type: String,  
    enum: ['upcoming', 'live', 'completed', 'cancelled'],  
    default: 'upcoming'  
  },  
  startDate: {  
    type: Date,  
    required: true  
  },  
  endDate: Date,  
  registrationDeadline: {  
    type: Date,  
    required: true  
  },  
  bracket: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Bracket'  
  },  
  rules: [String],  
  prizeDistribution: [{  
    position: Number,  
    prize: Number  
  }],  
  roomId: String,  
  roomPassword: String,  
  results: [{  
    team: {  
      type: mongoose.Schema.Types.ObjectId,  
      ref: 'Team'  
    },  
    position: Number,  
    kills: Number,  
    points: Number  
  }],  
  createdBy: {  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User'  
  },  
  createdAt: {  
    type: Date,  
    default: Date.now  
  }  
});  
  
module.exports = mongoose.model('Tournament', tournamentSchema);  
