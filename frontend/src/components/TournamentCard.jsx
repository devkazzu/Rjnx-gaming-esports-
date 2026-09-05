import React from 'react';  
import { Link } from 'react-router-dom';  
import { motion } from 'framer-motion';  
  
const TournamentCard = ({ tournament }) => {  
  const gameIcons = {  
    BGMI: '🎮',  
    'Free Fire': '🔥',  
    COD: '🎯',  
    Valorant: '⚔️'  
  };  
  
  return (  
    <motion.div  
      whileHover={{ y: -5 }}  
      className="glass-card p-6 hover:shadow-2xl transition-shadow"  
    >  
      <div className="flex justify-between items-start mb-4">  
        <div className="text-4xl">{gameIcons[tournament.game] || '🎮'}</div>  
        <span className={`px-3 py-1 rounded-full text-sm ${  
          tournament.status === 'live' ? 'bg-red-500 text-white' :  
          tournament.status === 'upcoming' ? 'bg-green-500 text-white' :  
          'bg-gray-500 text-white'  
        }`}>  
          {tournament.status.toUpperCase()}  
        </span>  
      </div>  
        
      <h3 className="text-xl font-bold mb-2">{tournament.name}</h3>  
      <div className="space-y-2 text-sm text-gray-400">  
        <div className="flex justify-between">  
          <span>Entry Fee:</span>  
          <span className={tournament.entryFee > 0 ? 'text-yellow-400' : 'text-green-400'}>  
            {tournament.entryFee > 0 ? `₹${tournament.entryFee}` : 'FREE'}  
          </span>  
        </div>  
        <div className="flex justify-between">  
          <span>Prize Pool:</span>  
          <span className="text-green-400">₹{tournament.prizePool.toLocaleString()}</span>  
        </div>  
        <div className="flex justify-between">  
          <span>Team Size:</span>  
          <span>{tournament.teamSize}</span>  
        </div>  
        <div className="flex justify-between">  
          <span>Deadline:</span>  
          <span>{new Date(tournament.registrationDeadline).toLocaleDateString()}</span>  
        </div>  
      </div>  
        
      <Link  
        to={`/register?tournament=${tournament._id}`}  
        className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg mt-4 transition-colors"  
      >  
        {tournament.status === 'live' ? 'Watch Live' : 'Register Now'}  
      </Link>  
    </motion.div>  
  );  
};  
  
export default TournamentCard;  
