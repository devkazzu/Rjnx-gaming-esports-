import React, { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
  const calculate = () => Math.max(0, new Date(targetDate).getTime() - Date.now());
  const [remaining, setRemaining] = useState(calculate());

  useEffect(() => {
    const timer = setInterval(() => setRemaining(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return <span className="countdown">{days}d {hours}h {minutes}m {seconds}s</span>;
}
