import React, { useState } from 'react';
import { addCost } from '../db/idb';
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

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];

function CostForm() {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addCost({ sum, category, description, date });
        setSum('');
        setCategory('');
        setDescription('');
        setDate('');
        setOpenAlert(true);
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
                <TextField
                    label="Sum"
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    required
                    variant="outlined"
                />

                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    multiline
                    rows={2}
                />

                <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    variant="outlined"
                />

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