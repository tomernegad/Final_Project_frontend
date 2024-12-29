import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CostForm from "./components/CostForm";
import Report from "./components/Report";
import PieChartComp from "./components/PieChart";

function App() {
  const [view, setView] = useState("add");

  return (
    <div>
      <h1>Cost Manager</h1>
      <button onClick={() => setView("add")}>Add Cost</button>
      <button onClick={() => setView("report")}>Monthly Report</button>
      <button onClick={() => setView("pie")}>Pie Chart</button>

      {view === "add" && <CostForm />}
      {view === "report" && <Report />}
      {view === "pie" && <PieChartComp />}
    </div>
  );
}

export default App;
