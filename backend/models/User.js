const mongoose = require('mongoose');  
  
const userSchema = new mongoose.Schema({  
  username: {  
    type: String,  
    required: true,  
    unique: true,  
    trim: true  
  },  
  email: {  
    type: String,  
    required: true,  
    unique: true,  
    lowercase: true  
  },  
  phone: {  
    type: String,  
    required: true,  
    unique: true  
  },  
  password: {  
    type: String,  
    required: true  
  },  
  role: {  
    type: String,  
    enum: ['player', 'admin', 'moderator'],  
    default: 'player'  
  },  
  walletBalance: {  
    type: Number,  
    default: 0  
  },  
  gameIds: {  
    bgmi: String,  
    freefire: String,  
    cod: String,  
    valorant: String  
  },  
  kycStatus: {  
    type: String,  
    enum: ['pending', 'verified', 'rejected'],  
    default: 'pending'  
  },  
  tournamentsPlayed: [{  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Tournament'  
  }],  
  earnings: {  
    type: Number,  
    default: 0  
  },  
  referrals: [{  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User'  
  }],  
  createdAt: {  
    type: Date,  
    default: Date.now  
  },  
  lastLogin: Date,  
  isActive: {  
    type: Boolean,  
    default: true  
  },  
  deviceInfo: {  
    ip: String,  
    device: String  
  }  
});  
  
module.exports = mongoose.model('User', userSchema);  
