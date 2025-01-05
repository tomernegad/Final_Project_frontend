import React, {useState} from "react";
import {getCostsByMonthYear} from "../db/db";

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
            {costs.length > 0 && (

                <div>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="4">Costs for {month.padStart(2, '0')}/{year}</th>
                        </tr>
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
                                <td>${cost.sum}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3">Total:</td>
                            <td>
                                ${costs.reduce((acc, cost) => acc + parseFloat(cost.sum), 0)}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Report;
