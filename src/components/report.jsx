import React, {useState} from 'react';
import {getCostsByMonthYear} from '../db/idb';
import {Pie} from 'react-chartjs-2';
import {categories} from '../db/cat';
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
    TableFooter
} from '@mui/material';

function Report() {

    const initReport = {};
    categories.forEach((category) => {
        initReport[category] = {
            count: 0,
            total: 0,
            instances: [],
        };
    });

    const [monthYear, setMonthYear] = useState('');
    const [categoryReport, setCategoryReport] = useState(initReport);
    const [chartData, setChartData] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalSum, setTotalSum] = useState(0.0);

    const handleFetchCosts = async () => {
        if (monthYear) {
            const [year, month] = monthYear.split('-');
            const fetchedCosts = await getCostsByMonthYear(
                parseInt(month),
                parseInt(year)
            );

            const report = {...initReport};
            let count = 0;
            let sum = 0.0;


            fetchedCosts.forEach((cost) => {
                if (categories.includes(cost.category)) {
                    const rep = report[cost.category]
                    rep['count']++;
                    rep['total'] += parseFloat(cost.sum);
                    rep['instances'].push(cost);
                    count++;
                    sum += parseFloat(cost.sum);
                }
            });

            setCategoryReport(report);
            setTotalCount(count);
            setTotalSum(sum);


            setChartData({
                labels: categories,
                datasets: [
                    {
                        label: 'Costs by Category for ' + month.padStart(2, '0') + '/' + year,
                        data: categories.map((category) => report[category]['total']),
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
            <Typography variant="h5" gutterBottom align="center" sx={{mb: 4}}>
                Monthly Report
            </Typography>

            <Box sx={{mb: 4, display: 'flex', gap: 2}}>
                <TextField
                    label="Month"
                    type="month"
                    value={monthYear}
                    onChange={(e) => setMonthYear(e.target.value)}
                    variant="outlined"
                    placeholder={'YYYY-MM'}
                    fullWidth
                    slotProps={{inputLabel: {shrink: true}}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchCosts}
                >
                    Get Report
                </Button>
            </Box>

            <Box sx={{display: 'flex', gap: 4}}>
                <TableContainer component={Paper} sx={{flex: 1}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Count</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {categories.map((category) => (
                                <React.Fragment key={category}>
                                    <TableRow key={category}>
                                        <TableCell>{category}</TableCell>
                                        <TableCell>{categoryReport[category]['count']}</TableCell>
                                        <TableCell>{categoryReport[category]['total']}</TableCell>
                                    </TableRow>

                                    {categoryReport[category]['instances'].length > 0 && <TableRow>
                                        <TableCell colSpan={3}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Description</TableCell>
                                                        <TableCell>Sum</TableCell>
                                                        <TableCell>Day</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {categoryReport[category]['instances'].map((cost) => (
                                                        <TableRow key={cost.id}>
                                                            <TableCell>{cost.description}</TableCell>
                                                            <TableCell>{cost.sum}</TableCell>
                                                            <TableCell>{cost.date.substring(cost.date.length - 2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>}
                                </React.Fragment>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{totalCount}</TableCell>
                                <TableCell>{totalSum}</TableCell>
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
        </Paper>
    );
}

export default Report;