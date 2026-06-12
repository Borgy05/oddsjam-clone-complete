import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// SPEC-NOTE: dev-only debug handles for automated smoke tests; stripped from
// production builds by Vite's dead-code elimination.
if (import.meta.env.DEV) {
  void import("tone").then((Tone) => {
    (window as unknown as Record<string, unknown>).Tone = Tone;
  });
  void import("./audio/audioEngine").then((engine) => {
    (window as unknown as Record<string, unknown>).__engine = engine;
  });
}
