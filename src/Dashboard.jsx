import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [showLineChart, setShowLineChart] = useState(true);
    const [showBarChart, setShowBarChart] = useState(true);
    const [lineChartData, setLineChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);

    const apiKey = 'qhHAMpkaPtavZ8gHFjC3mWtv6Rncsfik'; // Every user must enter his key
    const startDate = '2023-07-01';
    const endDate = '2023-07-31';

    // Fetch data for Line Chart (USD to EUR exchange rate over last 30 days)
    useEffect(() => {
        axios.get(`https://api.apilayer.com/exchangerates_data/timeseries?apikey=${apiKey}&start_date=${startDate}&end_date=${endDate}&symbols=EUR&base=USD`)
            .then((res) => {
                console.log('API Response:', res); // Log the entire response
    
                if (res.data && res.data.rates) {
                    const data = res.data.rates;
    
                    const labels = Object.keys(data); // Dates
                    const rates = Object.values(data).map(rate => rate.EUR); // EUR rates
    
                    setLineChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'USD to EUR',
                                data: rates,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                        ],
                    });
                } else {
                    console.error('No rates data returned from API');
                }
            })
            .catch((err) => {
                console.error('Error fetching line chart data:', err);
            });
    }, []);
    

    // Fetch data for Bar Chart (Latest USD exchange rates)
    useEffect(() => {
        axios.get(`https://api.apilayer.com/exchangerates_data/latest?apikey=${apiKey}&symbols=EGP,GBP,EUR&base=USD`)
            .then((res) => {
                if (res.data && res.data.rates) {
                    const data = res.data.rates;

                    setBarChartData({
                        labels: ['USD/EGP', 'USD/GBP', 'USD/EUR'],
                        datasets: [
                            {
                                label: 'Exchange Rates',
                                data: [data.EGP, data.GBP, data.EUR],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(75, 192, 192, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    });
                } else {
                    console.error('No rates data returned from API');
                }
            })
            .catch((err) => {
                console.error('Error fetching bar chart data:', err);
            });
    }, []);



        /**
     * Toggle change between edit mode and view mode.
     */
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };


    /**
     * Hides a chart based on its type.
     * 
     * @param {string} boxType - Type of the chart to hide ('line' or 'bar').
     */

    const handleHideBox = (boxType) => {
        if (boxType === 'line') {
            setShowLineChart(false);
        } else if (boxType === 'bar') {
            setShowBarChart(false);
        }
    };


        /**
     * Shows a chart based on its type.
     * 
     * @param {string} boxType - Type of the chart to show ('line' or 'bar').
     */
    const handleAddBox = (boxType) => {
        if (boxType === 'line') {
            setShowLineChart(true);
        } else if (boxType === 'bar') {
            setShowBarChart(true);
        }
    };



    return (
        <div>
            <button onClick={toggleEditMode} className='btn'>
                {isEditMode ? 'Switch to View Mode' : 'Switch to Edit Mode'}
            </button>

            <div className="charts">
                {showLineChart && lineChartData && (
                    <div className="chart-container">
                        <h2 style={{ textAlign: 'center' }}>USD to EUR Exchange Rate (Last 30 Days)</h2>
                        <Line
                            className="show"
                            data={lineChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'USD to EUR Exchange Rate',
                                    },
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                        {isEditMode && (
                            <button className="btn hide_btn" onClick={() => handleHideBox('line')}>Hide Line Chart</button>
                        )}
                    </div>
                )}
                
                {showBarChart && barChartData && (
                    <div className="chart-container">
                        <h2 style={{ textAlign: 'center' }}>Latest USD Exchange Rates</h2>
                        <Bar
                            className="show"
                            data={barChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                        text: 'Latest Exchange Rates',
                                    },
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                        {isEditMode && (
                            <button className="btn hide_btn" onClick={() => handleHideBox('bar')}>Hide Bar Chart</button>
                        )}
                    </div>
                )}
            </div>

            {isEditMode && !showLineChart && (
                <button className="btn add_btn" onClick={() => handleAddBox('line')}>Add Line Chart</button>
            )}

            {isEditMode && !showBarChart && (
                <button className="btn add_btn" onClick={() => handleAddBox('bar')}>Add Bar Chart</button>
            )}
        </div>
    );
}

export default Dashboard;