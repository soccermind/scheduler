// import React, { useState } from "react";
import { useState } from "react";

export default function useVisualMode(initial) {
  // const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      // setHistory([...history.slice(0,history.length -1), newMode]);
      setHistory(prev => [...prev.slice(0,prev.length -1), newMode]);
    } else {
      // setHistory([...history, newMode]);
      setHistory(prev => [...prev, newMode])
    }
    // setMode(newMode);
  };

  const back = () => {
    // const newHistory = [...history.slice(0,history.length -1)]
    if (history.length > 1) {
      // setHistory([...history.slice(0,history.length -1)]);
      setHistory(prev => [...prev.slice(0,prev.length -1)]);
    }
    // setMode(prev => prev[prev.length-1]);
  }
  return { mode: history[history.length-1], transition, back };
};