import React, { useState, useEffect } from 'react';  
import { motion } from 'framer-motion';  
import TournamentCard from '../components/TournamentCard';  
import SearchBar from '../components/SearchBar';  
import FilterButtons from '../components/FilterButtons';  
import { fetchTournaments } from '../services/api';  
  
const Tournaments = () => {  
  const [tournaments, setTournaments] = useState([]);  
  const [filter, setFilter] = useState('all');  
  const [search, setSearch] = useState('');  
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {  
    loadTournaments();  
  }, []);  
  
  const loadTournaments = async () => {  
    try {  
      const data = await fetchTournaments();  
      setTournaments(data);  
      setLoading(false);  
    } catch (error) {  
      console.error('Failed to load tournaments:', error);  
      setLoading(false);  
    }  
  };  
  
  const filteredTournaments = tournaments.filter(tournament => {  
    const matchesFilter = filter === 'all' || tournament.game === filter;  
    const matchesSearch = tournament.name.toLowerCase().includes(search.toLowerCase());  
    return matchesFilter && matchesSearch;  
  });  
  
  return (  
    <div className="py-8 px-4">  
      <div className="max-w-6xl mx-auto">  
        <h1 className="text-4xl font-bold mb-8 text-center neon-text-purple">  
          Tournaments  
        </h1>  
          
        <SearchBar search={search} setSearch={setSearch} />  
        <FilterButtons filter={filter} setFilter={setFilter} />  
          
        {loading ? (  
          <div className="flex justify-center items-center h-64">  
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>  
          </div>  
        ) : (  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">  
            {filteredTournaments.map((tournament, index) => (  
              <motion.div  
                key={tournament._id}  
                initial={{ opacity: 0, y: 20 }}  
                animate={{ opacity: 1, y: 0 }}  
                transition={{ delay: index * 0.1 }}  
              >  
                <TournamentCard tournament={tournament} />  
              </motion.div>  
            ))}  
          </div>  
        )}  
      </div>  
    </div>  
  );  
};  
  
export default Tournaments;  
