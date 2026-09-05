import React from "react";
import CountdownTimer from "./CountdownTimer";

export default function TournamentCard({ tournament, onRegister }) {
  if (!tournament) return null;

  return (
    <article className="tournament-card">
      <h3>{tournament.name}</h3>
      <p>Prize Pool: ₹{tournament.prizePool ?? 0}</p>
      <p>Entry Fee: ₹{tournament.entryFee ?? 0}</p>
      <p>Slots: {tournament.slots ?? "—"}</p>
      {tournament.startTime && <CountdownTimer targetDate={tournament.startTime} />}
      <button onClick={() => onRegister?.(tournament)}>Register</button>
    </article>
  );
}
