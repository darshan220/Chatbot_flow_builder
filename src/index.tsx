import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { ReactFlowProvider } from "reactflow";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </React.StrictMode>
);
