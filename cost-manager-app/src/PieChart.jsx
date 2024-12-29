import React, { useState } from "react";
import { getCostsByMonthYear } from "./db";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

/**
 * PieChart Component - Displays total costs for a month/year grouped by category.
 * @returns {JSX.Element}
 */
function PieChartComp() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [chartData, setChartData] = useState(null);

  /**
   * Fetches costs and sums them by category.
   */
  const handleFetchData = async () => {
    if (month && year) {
      const costs = await getCostsByMonthYear(parseInt(month), parseInt(year));
      const categoryTotals = {};
      costs.forEach((cost) => {
        const cat = cost.category;
        if (!categoryTotals[cat]) {
          categoryTotals[cat] = 0;
        }
        categoryTotals[cat] += parseFloat(cost.sum);
      });

      const labels = Object.keys(categoryTotals);
      const dataValues = Object.values(categoryTotals);

      setChartData({
        labels,
        datasets: [
          {
            label: "Costs",
            data: dataValues,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#8B008B",
              "#00FF00",
              "#FF00FF",
              "#D2691E",
            ],
          },
        ],
      });
    }
  };

  return (
    <div>
      <div>
        <label>Month:</label>
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="1-12"
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2023"
        />
      </div>
      <button onClick={handleFetchData}>Show Pie Chart</button>
      {chartData && <Pie data={chartData} />}
    </div>
  );
}

export default PieChartComp;
