This project is a dashboard application built with React that includes interactive line and bar charts using chart.js. The dashboard is designed to display exchange rate data and includes functionalities for switching between view and edit modes.

Features:
    Line Chart: Displays the USD to EUR exchange rate over a specified period.
    Bar Chart: Shows the latest exchange rates for USD/EGP, USD/GBP, and USD/EUR.
    View Mode: Default mode to view charts.
    Edit Mode: Allows hiding and showing charts dynamically.

Technologies:
    React
    chart.js
    react-chartjs-2
    Axios

Install additional libraries:
    1- Axios: For making HTTP requests:
        npm install axios

    Import Axios in your file:
        import axios from 'axios';


    2- Chart.js and React Chart.js 2:
        npm install chart.js react-chartjs-2

    Import Line chart and Bar chart in your file
        import { Line, Bar } from 'react-chartjs-2';

Must Enter Your api key 
    const apiKey = 'your key';


Start the development server:
    npm start


