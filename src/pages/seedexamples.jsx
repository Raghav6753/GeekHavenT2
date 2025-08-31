import React from "react";
import "./seedexamples.css";
import { useSeed } from "../context/SeedContext";

function SeedSwatch({ seed, active, onClick }) {
  const s = seed.toString();
  const n = s.split("").reduce((acc, ch) => acc + (parseInt(ch) || 0), 0);
  const hue = (n * 37) % 360;
  const color = `hsl(${hue} 80% 50%)`;
  return (
    <button className={`seed-swatch ${active ? 'active' : ''}`} onClick={() => onClick(seed)}>
      <div className="swatch-box" style={{ background: color }} />
      <div className="swatch-meta">
        <div className="swatch-seed">{seed}</div>
        <div className="swatch-color">{color}</div>
      </div>
    </button>
  );
}

export default function SeedExamples() {
  const examples = ["035", "111", "999", "420", "007", "12345", "8080"];
  const { seed: current, setSeed } = useSeed();
  return (
    <div className="seed-examples-page">
      <h2>Seed color examples</h2>
      <p>Click a swatch to set the app seed; it is persisted to localStorage.</p>
      <div className="swatches">
        {examples.map((s) => (
          <SeedSwatch key={s} seed={s} active={s === current} onClick={setSeed} />
        ))}
      </div>
    </div>
  );
}
