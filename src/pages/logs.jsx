import React from "react";
import { useSeed } from "../context/SeedContext";
import "./logs.css";

export default function LogsPage() {
  const { logs } = useSeed();
  return (
    <div className="logs-page">
      <h1>Recent Actions</h1>
      <div className="logs-list">
        {logs.slice(0, 20).map((l, idx) => (
          <div key={idx} className="log-item">
            <div className="log-ts">{new Date(l.ts).toLocaleString()}</div>
            <div className="log-action">{l.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
