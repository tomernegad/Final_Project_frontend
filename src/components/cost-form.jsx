import React, { useState } from 'react';
import { addCost } from '../db/idb';
import {categories} from '../db/cat';
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

function CostForm() {
    // State variables for form inputs and alert
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        await addCost({ sum, category, description, date });
        // Reset form fields
        setSum('');
        setCategory('');
        setDescription('');
        setDate('');
        setOpenAlert(true); // Show success alert
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
                Add New Cost
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                {/* Input field for sum */}
                <TextField
                    label="Sum"
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    required
                    variant="outlined"
                />

                {/* Dropdown menu for category selection */}
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        variant="outlined">
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Input field for description */}
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    multiline
                    rows={2}
                />

                {/* Input field for date */}
                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    variant="outlined"
                />

                {/* Submit button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Add Cost
                </Button>
            </Box>

            {/* Success alert */}
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => setOpenAlert(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Cost added successfully!
                </Alert>
            </Snackbar>
        </Paper>
    );
}

export default CostForm;