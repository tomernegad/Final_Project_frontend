import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CostForm from "./components/CostForm";
import Report from "./components/Report";
import PieChartComp from "./components/PieChart";

function App() {
  const [view, setView] = useState("add"); // 'view' state controls which component is shown.

  return (
    <div>
      <h1>Cost Manager</h1>
      {/* Buttons to switch between different views */}
      <button onClick={() => setView("add")}>Add Cost</button>
      <button onClick={() => setView("report")}>Monthly Report</button>
      <button onClick={() => setView("pie")}>Pie Chart</button>
      {/* Conditional rendering based on the 'view' state */}
      {view === "add" && <CostForm />}
      {view === "report" && <Report />}
      {view === "pie" && <PieChartComp />}
    </div>
  );
}

export default App;
