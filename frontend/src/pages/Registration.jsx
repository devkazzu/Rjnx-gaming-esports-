import React, { useState } from 'react';  
import { useQuery } from 'react-query';  
import { useSearchParams } from 'react-router-dom';  
import { toast } from 'react-hot-toast';  
import TeamRegistration from '../components/TeamRegistration';  
import PlayerRegistration from '../components/PlayerRegistration';  
import PaymentGateway from '../components/PaymentGateway';  
import { registerForTournament } from '../services/api';  
  
const Registration = () => {  
  const [searchParams] = useSearchParams();  
  const tournamentId = searchParams.get('tournament');  
  const [registrationType, setRegistrationType] = useState('solo');  
  const [formData, setFormData] = useState({  
    playerName: '',  
    gameId: '',  
    email: '',  
    phone: '',  
    teamName: '',  
    teammates: []  
  });  
  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
      
    try {  
      const response = await registerForTournament({  
        tournamentId,  
        ...formData,  
        registrationType  
      });  
        
      toast.success('Registration successful!');  
        
      if (response.data.requiresPayment) {  
        // Show payment modal  
        setShowPayment(true);  
      }  
    } catch (error) {  
      toast.error(error.response?.data?.message || 'Registration failed');  
    }  
  };  
  
  return (  
    <div className="max-w-2xl mx-auto py-8 px-4">  
      <h1 className="text-3xl font-bold mb-8 text-center neon-text-purple">  
        Tournament Registration  
      </h1>  
        
      <div className="glass-card p-6">  
        <div className="flex gap-4 mb-6">  
          <button  
            onClick={() => setRegistrationType('solo')}  
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${  
              registrationType === 'solo'   
                ? 'bg-purple-600 text-white'   
                : 'bg-gray-700 text-gray-300'  
            }`}  
          >  
            Solo  
          </button>  
          <button  
            onClick={() => setRegistrationType('team')}  
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${  
              registrationType === 'team'   
                ? 'bg-cyan-500 text-white'   
                : 'bg-gray-700 text-gray-300'  
            }`}  
          >  
            Team  
          </button>  
        </div>  
          
        <form onSubmit={handleSubmit} className="space-y-4">  
          {registrationType === 'solo' ? (  
            <PlayerRegistration formData={formData} setFormData={setFormData} />  
          ) : (  
            <TeamRegistration formData={formData} setFormData={setFormData} />  
          )}  
            
          <div className="grid grid-cols-2 gap-4">  
            <div>  
              <label className="block text-sm text-gray-400 mb-2">Game ID</label>  
              <input  
                type="text"  
                value={formData.gameId}  
                onChange={(e) => setFormData({ ...formData, gameId: e.target.value })}  
                className="w-full bg-gray-800 rounded-lg p-3 focus:outline-none focus:border-purple-500"  
                placeholder="Enter game ID"  
                required  
              />  
            </div>  
            <div>  
              <label className="block text-sm text-gray-400 mb-2">Phone Number</label>  
              <input  
                type="tel"  
                value={formData.phone}  
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}  
                className="w-full bg-gray-800 rounded-lg p-3 focus:outline-none focus:border-purple-500"  
                placeholder="Enter phone number"  
                required  
              />  
            </div>  
          </div>  
            
          <div className="flex items-center justify-between">  
            <div className="flex items-center">  
              <input type="checkbox" id="terms" required />  
              <label htmlFor="terms" className="ml-2 text-sm text-gray-400">  
                I agree to the terms and conditions  
              </label>  
            </div>  
          </div>  
            
          <button  
            type="submit"  
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"  
          >  
            Register for Tournament  
          </button>  
        </form>  
      </div>  
    </div>  
  );  
};  
  
export default Registration;  
