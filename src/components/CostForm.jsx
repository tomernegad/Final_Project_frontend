import React, {useState} from 'react';
import {addCost} from '../db/db';

/**
 * CostForm Component - Form to add a new cost item.
 * @returns {JSX.Element}
 */
function CostForm() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    /**
     * Handles the form submission.
     * @param {Object} event
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        await addCost({sum, category, description, date});
        setSum('');
        setCategory('');
        setDescription('');
        setDate('');
        alert('Cost added successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Sum:</label>
                <input
                    type='number'
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date (dd/mm/yyyy):</label>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Add Cost</button>
        </form>
    );
}

export default CostForm;
