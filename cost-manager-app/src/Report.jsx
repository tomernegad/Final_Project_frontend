import React, { useState } from "react";
import { getCostsByMonthYear } from "./db";

/**
 * Report Component - Displays costs for a given month/year.
 * @returns {JSX.Element}
 */
function Report() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [costs, setCosts] = useState([]);

  /**
   * Fetches costs when the button is clicked.
   */
  const handleFetchCosts = async () => {
    if (month && year) {
      const fetchedCosts = await getCostsByMonthYear(
        parseInt(month),
        parseInt(year)
      );
      setCosts(fetchedCosts);
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
      <button onClick={handleFetchCosts}>Get Report</button>
      <div>
        <h3>Costs:</h3>
        <ul>
          {costs.map((cost) => (
            <li key={cost.id}>
              {`${cost.date} - ${cost.category} - ${cost.description} - $${cost.sum}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Report;
