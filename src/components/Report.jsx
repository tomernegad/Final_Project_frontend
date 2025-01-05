import React, { useState } from "react";
import { getCostsByMonthYear } from "../db/db";

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
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Sum</th>
            </tr>
            </thead>
            <tbody>
          {costs.map((cost) => (
            <tr key={cost.id}>
                <td>{cost.date}</td>
                <td>{cost.category}</td>
                <td>{cost.description}</td>
                <td>{`$${cost.sum}`}</td>
            </tr>
          ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default Report;
