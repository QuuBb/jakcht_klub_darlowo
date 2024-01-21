<?php
// Allow requests from the specific origin (replace with the actual origin of your React app)
header("Access-Control-Allow-Origin: http://192.168.100.9:5995");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Function to generate a random token
function generateToken($length = 32)
{
    return bin2hex(random_bytes($length));
}

// Function to set a cookie with the generated token
function setTokenCookie($token)
{
    $expirationTime = time() + 900; // 900 seconds (15 minutes) from now
    $cookie_options = array(
        'expires' => $expirationTime,
        'path' => '/',
        'domain' => '',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'None'
    );

    setcookie('auth_token', $token, $cookie_options);

    // Log the cookie setting
    if (isset($_COOKIE['auth_token'])) {
        error_log('Cookie set: ' . $_COOKIE['auth_token']);
    } else {
        error_log('Cookie not set');
    }
}

// Function to validate login credentials (replace with your actual validation logic)
function validateCredentials($username, $password)
{
    // Replace this with your actual validation logic
    $validUsername = 'admin';
    $validPassword = 'admin';

    return ($username === $validUsername && $password === $validPassword);
}


// Function to validate login credentials (replace with your actual validation logic)
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the username and password from the form
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate the credentials
    if (validateCredentials($username, $password)) {
        // Generate a token
        $token = generateToken();

        // Set the token as a cookie
        setTokenCookie($token);

        // Send a JSON response indicating success
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Login successful']);
        exit;
    } else {
        // Send a JSON response indicating failure
        header('HTTP/1.1 401 Unauthorized');
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid username or password']);
        exit;
    }
}


// Send a JSON response indicating that the request method is not allowed
header('HTTP/1.1 405 Method Not Allowed');
header('Content-Type: application/json');
echo json_encode(['error' => 'Method Not Allowed']);
exit;
