import React, { useState, useEffect } from 'react';  
  
const CountdownTimer = ({ targetDate }) => {  
  const [timeLeft, setTimeLeft] = useState({  
    days: 0,  
    hours: 0,  
    minutes: 0,  
    seconds: 0  
  });  
  
  useEffect(() => {  
    const timer = setInterval(() => {  
      const now = new Date();  
      const target = new Date(targetDate);  
      const diff = target - now;  
  
      if (diff <= 0) {  
        clearInterval(timer);  
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });  
        return;  
      }  
  
      setTimeLeft({  
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),  
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),  
        minutes: Math.floor((diff / (1000 * 60)) % 60),  
        seconds: Math.floor((diff / 1000) % 60)  
      });  
    }, 1000);  
  
    return () => clearInterval(timer);  
  }, [targetDate]);  
  
  return (  
    <div className="flex gap-4 justify-center">  
      {Object.entries(timeLeft).map(([unit, value]) => (  
        <div key={unit} className="text-center">  
          <div className="bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg p-4 min-w-[100px]">  
            <div className="text-4xl font-bold text-white">  
              {String(value).padStart(2, '0')}  
            </div>  
            <div className="text-sm text-gray-300 capitalize mt-2">{unit}</div>  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  
  
export default CountdownTimer;  
