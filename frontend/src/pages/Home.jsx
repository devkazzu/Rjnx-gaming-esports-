import React, { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import api from "../services/api";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    api.get("/tournaments").then(res => setTournaments(res.data)).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Welcome to RJNX Gaming</h1>
      <p>Compete, win and climb the leaderboard.</p>
      <section>
        {tournaments.map(t => (
          <TournamentCard key={t._id || t.id} tournament={t} />
        ))}
      </section>
    </main>
  );
}
