import React, { useEffect, useState } from "react";
import TournamentCard from "../components/TournamentCard";
import api from "../services/api";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    api.get("/tournaments").then(res => setTournaments(res.data)).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Tournaments</h1>
      {tournaments.map(t => (
        <TournamentCard key={t._id || t.id} tournament={t} />
      ))}
    </main>
  );
}
