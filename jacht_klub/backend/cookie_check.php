<?php
// load_auth_token.php

header("Access-Control-Allow-Origin: http://192.168.100.9:5995");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Function to check if the "auth_token" cookie is set
function checkAuthToken()
{
    if (isset($_COOKIE['auth_token'])) {
        // If the cookie is set, return its value
        header('Content-Type: application/json');
        echo json_encode(['auth_token' => $_COOKIE['auth_token']]);
        exit;
    } else {
        // If the cookie is not set, return an error message
        header('HTTP/1.1 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Auth Token not set']);
        exit;
    }
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Call the function to check the "auth_token" cookie
    checkAuthToken();
}

// Send a JSON response indicating that the request method is not allowed
header('HTTP/1.1 405 Method Not Allowed');
header('Content-Type: application/json');
echo json_encode(['error' => 'Method Not Allowed']);
exit;
?>