const express = require('express');
const WebSocket = require('ws');
const app = express();

// Use Static Middleware to serve files from the 'public' folder
app.use(express.static('public'));

// Set the port (use ENV variable or default to 8080)
const PORT = process.env.PORT || 8080;

// Create HTTP server for Express app
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connection
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    // Send temperature data periodically
    setInterval(() => {
        const temperature = getRandomTemperature();
        const humidity = getRandomHumidity();
        console.log('Sending data:', 'Temp ', temperature, ' Hum ', humidity);    // Log the data sent to the client
        ws.send(JSON.stringify({ temperature, humidity }));     // Send the temperature data to the client
    }, 2000); // Send data every 2 seconds

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
});

// Function to generate a random temperature
function getRandomTemperature() {
    return (Math.random() * 10 + 20).toFixed(2); // Random temperature between 20-30°C
}

// Function to generate a random Humidity
function getRandomHumidity() {
    return (Math.random() * 50 + 30).toFixed(2); // ค่า 30-80%
}
