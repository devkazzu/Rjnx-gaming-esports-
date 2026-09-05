import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { QueryClient, QueryClientProvider } from 'react-query';  
import { Toaster } from 'react-hot-toast';  
import Navbar from './components/Navbar';  
import Footer from './components/Footer';  
import Home from './pages/Home';  
import Tournaments from './pages/Tournaments';  
import Registration from './pages/Registration';  
import Results from './pages/Results';  
import Leaderboard from './pages/Leaderboard';  
import Profile from './pages/Profile';  
import AdminPanel from './pages/AdminPanel';  
import { AuthProvider } from './context/AuthContext';  
import { SocketProvider } from './context/SocketContext';  
import './styles/global.css';  
  
const queryClient = new QueryClient();  
  
function App() {  
  return (  
    <QueryClientProvider client={queryClient}>  
      <AuthProvider>  
        <SocketProvider>  
          <Router>  
            <div className="min-h-screen bg-dark-primary">  
              <Navbar />  
              <Routes>  
                <Route path="/" element={<Home />} />  
                <Route path="/tournaments" element={<Tournaments />} />  
                <Route path="/register" element={<Registration />} />  
                <Route path="/results" element={<Results />} />  
                <Route path="/leaderboard" element={<Leaderboard />} />  
                <Route path="/profile" element={<Profile />} />  
                <Route path="/admin" element={<AdminPanel />} />  
              </Routes>  
              <Footer />  
              <Toaster position="top-right" />  
            </div>  
          </Router>  
        </SocketProvider>  
      </AuthProvider>  
    </QueryClientProvider>  
  );  
}  
  
export default App;  
