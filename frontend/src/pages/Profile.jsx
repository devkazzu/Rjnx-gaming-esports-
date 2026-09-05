import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/users/me").then(res => setProfile(res.data)).catch(console.error);
  }, []);

  if (!profile) return <main><p>Loading profile...</p></main>;

  return (
    <main>
      <h1>{profile.username}</h1>
      <p>Email: {profile.email}</p>
      <p>Points: {profile.points ?? 0}</p>
    </main>
  );
}
