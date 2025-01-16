import React, {useState} from 'react';
import {getCostsByMonthYear} from '../db/idb';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
} from '@mui/material';

function Report() {
    const [monthYear, setMonthYear] = useState('');
    const [costs, setCosts] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleFetchCosts = async () => {
        if (monthYear) {
            const [year, month] = monthYear.split('-');
            setMonth(month);
            setYear(year);
            const fetchedCosts = await getCostsByMonthYear(
                parseInt(month),
                parseInt(year)
            );
            setCosts(fetchedCosts);

            const categoryTotals = {};
            fetchedCosts.forEach((cost) => {
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
                        label: 'Costs by Category for ' + month.padStart(2, '0') + '/' + year,
                        data: dataValues,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#8B008B',
                            '#00FF00',
                            '#FF00FF',
                            '#D2691E',
                        ],
                    },
                ],
            });
        }
    };

    return (
        <Paper elevation={3} sx={{p: 4, borderRadius: 2}}>
            <Typography variant='h5' gutterBottom align='center' sx={{mb: 4}}>
                Monthly Report
            </Typography>

            <Box sx={{mb: 4, display: 'flex', gap: 2}}>
                <TextField
                    label='Month'
                    type='month'
                    value={monthYear}
                    onChange={(e) => setMonthYear(e.target.value)}
                    variant='outlined'
                    placeholder={'YYYY-MM'}
                    fullWidth
                />
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleFetchCosts}
                >
                    Get Report
                </Button>
            </Box>

            {costs.length > 0 && (
                <Box sx={{display: 'flex', gap: 4}}>
                    <TableContainer component={Paper} sx={{flex: 1}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align='center'>
                                        Costs for {month.padStart(2, '0')}/{year}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Sum</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {costs.map((cost) => (
                                    <TableRow key={cost.id}>
                                        <TableCell sx={{whiteSpace: 'nowrap'}}>{cost.date}</TableCell>
                                        <TableCell>{cost.category}</TableCell>
                                        <TableCell>{cost.description}</TableCell>
                                        <TableCell>${cost.sum}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total:</TableCell>
                                    <TableCell>
                                        ${costs.reduce((acc, cost) => acc + parseFloat(cost.sum), 0)}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    {chartData && (
                        <Box sx={{flex: 1}}>
                            <Pie data={chartData} options={{plugins: {legend: {position: 'bottom'}}}}/>
                        </Box>
                    )}
                </Box>
            )}
        </Paper>
    );
}

export default Report;