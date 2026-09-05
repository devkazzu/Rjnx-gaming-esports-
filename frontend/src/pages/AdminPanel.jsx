import React, { useState } from 'react';  
import { useQuery, useMutation, useQueryClient } from 'react-query';  
import StatsDashboard from '../components/admin/StatsDashboard';  
import TournamentManagement from '../components/admin/TournamentManagement';  
import UserManagement from '../components/admin/UserManagement';  
import { fetchAdminStats, createTournament, updateTournament } from '../services/api';  
  
const AdminPanel = () => {  
  const [activeTab, setActiveTab] = useState('dashboard');  
  const queryClient = useQueryClient();  
  
  const { data: stats } = useQuery('adminStats', fetchAdminStats);  
  
  const createTournamentMutation = useMutation(createTournament, {  
    onSuccess: () => {  
      queryClient.invalidateQueries('adminStats');  
    }  
  });  
  
  return (  
    <div className="max-w-7xl mx-auto py-8 px-4">  
      <h1 className="text-3xl font-bold mb-8 neon-text-purple">  
        Admin Panel  
      </h1>  
        
      <div className="flex gap-4 mb-8">  
        <button  
          onClick={() => setActiveTab('dashboard')}  
          className={`px-4 py-2 rounded-lg font-semibold ${  
            activeTab === 'dashboard' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'  
          }`}  
        >  
          Dashboard  
        </button>  
        <button  
          onClick={() => setActiveTab('tournaments')}  
          className={`px-4 py-2 rounded-lg font-semibold ${  
            activeTab === 'tournaments' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'  
          }`}  
        >  
          Tournaments  
        </button>  
        <button  
          onClick={() => setActiveTab('users')}  
          className={`px-4 py-2 rounded-lg font-semibold ${  
            activeTab === 'users' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'  
          }`}  
        >  
          Users  
        </button>  
      </div>  
  
      {activeTab === 'dashboard' && <StatsDashboard stats={stats} />}  
      {activeTab === 'tournaments' && <TournamentManagement mutation={createTournamentMutation} />}  
      {activeTab === 'users' && <UserManagement />}  
    </div>  
  );  
};  
  
export default AdminPanel;  
