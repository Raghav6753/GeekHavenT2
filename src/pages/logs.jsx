import React from "react";
import { useSeed } from "../context/SeedContext";
import "./logs.css";

export default function LogsPage() {
  const { logs } = useSeed();
  const logsArray = Array.isArray(logs) ? logs : [];
  return (
    <div className="logs-page">
      <h1>Recent Requests</h1>
      <div className="logs-list">
        {logsArray.slice(0, 50).map((l, idx) => (
          <div key={idx} className="log-item">
            <div className="log-ts">{new Date(l.ts).toLocaleString()}</div>
            <div className="log-details">
              <span className="log-method">{l.method}</span>
              <span className="log-path">{l.path}</span>
              {l.user && <span className="log-user">User: {l.user}</span>}
              <span className="log-ip">IP: {l.ip}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
