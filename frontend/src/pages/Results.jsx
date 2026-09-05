import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/tournaments/results").then(res => setResults(res.data)).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Results</h1>
      {results.map((result, index) => (
        <div key={result._id || index}>{result.teamName} — {result.position}</div>
      ))}
    </main>
  );
}
