import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from '../react_elements/landing/Landing';
import '../styles/index.css';

// Function to get the value of a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Check if the user is logged in based on the 'auth_token' cookie
const isLoggedIn = !!getCookie('auth_token');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Landing isLoggedIn={isLoggedIn} />
    </React.StrictMode>
);
