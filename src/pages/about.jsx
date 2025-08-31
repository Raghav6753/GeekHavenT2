import React from "react";
import { useSeed } from "../context/SeedContext";
import { useNavigate } from "react-router-dom";
import "./about.css";

export default function AboutPage() {
  const { seed, themeColor } = useSeed();
  const navigate = useNavigate();
  return (
    <div className="about-page" style={{ borderTop: `6px solid ${themeColor}` }}>
      <div className="about-content">
        <h1>About This Build</h1>
        <p>Assignment seed:</p>
        <div className="seed-pill" style={{ background: themeColor }}>{seed}</div>
        <p>This seed drives theme color and platform fee rate on the frontend.</p>
        <div style={{ marginTop: 12 }}>
          <button className="seed-examples-btn" onClick={() => navigate('/seed-examples')}>See seed examples</button>
        </div>
      </div>
    </div>
  );
}
