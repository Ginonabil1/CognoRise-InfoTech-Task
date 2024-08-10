import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';
import axios from 'axios';

// Mock axios module
jest.mock('axios');

// Mock chart components
jest.mock('react-chartjs-2', () => ({
    Line: () => <div>Line Chart</div>,
    Bar: () => <div>Bar Chart</div>,
}));

describe('Dashboard Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.resetAllMocks();
    });

    test('should render the dashboard and charts', async () => {
        // Mock the API responses
        axios.get.mockImplementation((url) => {
            if (url.includes('timeseries')) {
                return Promise.resolve({
                    data: {
                        rates: {
                            '2023-07-01': { EUR: 0.91605 },
                            // Add more dates and rates as needed for testing
                        },
                    },
                });
            } else if (url.includes('latest')) {
                return Promise.resolve({
                    data: {
                        rates: {
                            EGP: 30.0,
                            GBP: 0.75,
                            EUR: 0.91,
                        },
                    },
                });
            }
        });

        render(<Dashboard />);

        // Check if the Line Chart is displayed
        expect(screen.getByText('Line Chart')).toBeInTheDocument();
        // Check if the Bar Chart is displayed
        expect(screen.getByText('Bar Chart')).toBeInTheDocument();

        // Check that the toggle buttons are present
        expect(screen.getByText('Switch to Edit Mode')).toBeInTheDocument();
    });

    test('should toggle between view and edit modes', async () => {
        render(<Dashboard />);

        // Toggle to edit mode
        fireEvent.click(screen.getByText('Switch to Edit Mode'));

        // Verify that the button text has changed
        expect(screen.getByText('Switch to View Mode')).toBeInTheDocument();

        // Toggle back to view mode
        fireEvent.click(screen.getByText('Switch to View Mode'));

        // Verify that the button text has changed back
        expect(screen.getByText('Switch to Edit Mode')).toBeInTheDocument();
    });

    test('should hide and show charts in edit mode', async () => {
        render(<Dashboard />);

        // Enter edit mode
        fireEvent.click(screen.getByText('Switch to Edit Mode'));

        // Hide line chart
        fireEvent.click(screen.getByText('Hide Line Chart'));

        // Check that the line chart is no longer present
        expect(screen.queryByText('Line Chart')).not.toBeInTheDocument();

        // Show line chart again
        fireEvent.click(screen.getByText('Add Line Chart'));

        // Check that the line chart is now present
        expect(screen.getByText('Line Chart')).toBeInTheDocument();
    });
});
