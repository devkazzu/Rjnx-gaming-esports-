import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">RJNX Gaming</a>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/tournaments">Tournaments</a>
        <a href="/leaderboard">Leaderboard</a>
        <a href="/results">Results</a>
        <a href="/profile">Profile</a>
      </div>
    </nav>
  );
}
