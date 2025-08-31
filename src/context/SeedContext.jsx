import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const SeedContext = createContext();

export function SeedProvider({ seed = "035", children }) {
  const [logs, setLogs] = useState([]);
  const [currentSeed, setCurrentSeed] = useState(() => {
    try {
      const stored = localStorage.getItem("app_seed");
      return stored || seed;
    } catch (e) {
      return seed;
    }
  });

  const setSeed = (next) => {
    setCurrentSeed(next);
    try {
      localStorage.setItem("app_seed", next);
    } catch (e) {}
    addLog && addLog(`seed_change:${next}`);
  };

  const seedNumber = useMemo(() => {
    const numeric = parseInt(currentSeed.replace(/\D/g, "")) || 0;
    return numeric;
  }, [currentSeed]);

  const platformFeeRate = useMemo(() => {
    return (seedNumber % 10) / 100;
  }, [seedNumber]);

  const themeColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < currentSeed.length; i++) {
      hash = currentSeed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    return `hsl(${h} 70% 50%)`;
  }, [currentSeed]);

  const checksumForId = (id) => {
    const s = `${currentSeed}:${id}`;
    let sum = 0;
    for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
    return (sum % 10).toString();
  };

  const addLog = (action) => {
    const entry = { ts: new Date().toISOString(), action };
    setLogs((prev) => [entry, ...prev].slice(0, 100));
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--seed-accent', themeColor);
  }, [themeColor]);

  return (
    <SeedContext.Provider value={{ seed: currentSeed, setSeed, seedNumber, platformFeeRate, themeColor, checksumForId, logs, addLog }}>
      {children}
    </SeedContext.Provider>
  );
}

export function useSeed() {
  return useContext(SeedContext);
}
