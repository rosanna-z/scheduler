import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => {
        return [...prev].slice(0, -1);
        // newHistory.pop();
      });
    }
    setHistory((prev) => {
      setMode(newMode);
      return [...prev, newMode];
    });
  };

  const back = () => {
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = [...prev].slice(0, -1);
        // gets the last item in the array
        setMode(newHistory[newHistory.length-1]);
        return newHistory;
      });
    }
  };

  return { mode, transition, back, history };
}
