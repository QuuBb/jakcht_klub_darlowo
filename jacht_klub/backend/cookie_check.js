// load_auth_token.js

const express = require('express');
const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.100.9:5995');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Function to check if the "auth_token" cookie is set
function checkAuthToken(req, res) {
    if (req.cookies.auth_token) {
        // If the cookie is set, return its value
        res.json({ auth_token: req.cookies.auth_token });
    } else {
        // If the cookie is not set, return an error message
        res.status(401).json({ error: 'Auth Token not set' });
    }
}

// Route to handle GET requests
app.get('/', (req, res) => {
    checkAuthToken(req, res);
});

// Route to handle unsupported methods
app.use((req, res) => {
    res.status(405).json({ error: 'Method Not Allowed' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
