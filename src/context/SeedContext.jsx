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
    setLogs((prev) => {
      const prevLogs = Array.isArray(prev) ? prev : [];
      return [entry, ...prevLogs].slice(0, 100);
    });
  };

  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/logs/recent');
      if (response.ok) {
        const backendLogs = await response.json();
        setLogs(backendLogs);
        try {
          localStorage.setItem('app_logs', JSON.stringify(backendLogs));
        } catch (e) {
          // ignore localStorage errors
        }
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  // Load logs from localStorage on init
  useEffect(() => {
    try {
      const storedLogs = localStorage.getItem('app_logs');
      if (storedLogs) {
        const parsedLogs = JSON.parse(storedLogs);
        if (Array.isArray(parsedLogs)) {
          setLogs(parsedLogs);
        }
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--seed-accent', themeColor);
  }, [themeColor]);

  useEffect(() => {
    fetchLogs();
    // Refresh logs every 30 seconds
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SeedContext.Provider value={{ seed: currentSeed, setSeed, seedNumber, platformFeeRate, themeColor, checksumForId, logs, addLog, fetchLogs }}>
      {children}
    </SeedContext.Provider>
  );
}

export function useSeed() {
  return useContext(SeedContext);
}
