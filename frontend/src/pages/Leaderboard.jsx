import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/leaderboard").then(res => setUsers(res.data)).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Leaderboard</h1>
      <ol>
        {users.map(user => (
          <li key={user._id}>{user.username} — {user.points ?? 0} points</li>
        ))}
      </ol>
    </main>
  );
}
