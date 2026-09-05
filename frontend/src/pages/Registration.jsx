import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Registration() {
  const { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post(`/tournaments/${id}/register`, { teamName });
      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <main>
      <h1>Register for Tournament</h1>
      <form onSubmit={submit}>
        <input value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Team name" required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </main>
  );
}
