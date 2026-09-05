import React, { useState } from "react";
import api from "../services/api";

export default function AdminPanel() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const createTournament = async e => {
    e.preventDefault();
    try {
      await api.post("/tournaments", { name });
      setMessage("Tournament created.");
      setName("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Creation failed.");
    }
  };

  return (
    <main>
      <h1>Admin Panel</h1>
      <form onSubmit={createTournament}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Tournament name" required />
        <button type="submit">Create Tournament</button>
      </form>
      <p>{message}</p>
    </main>
  );
}
