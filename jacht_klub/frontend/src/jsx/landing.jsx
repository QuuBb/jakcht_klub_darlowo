import React from 'react';
import ReactDOM from 'react-dom';
import Landing from '../react_elements/landing/Landing';
import '../styles/index.css';
import CheckCookieComponent from '../react_elements/general/CheckCookie';

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

ReactDOM.render(
    <React.StrictMode>
        <Landing />
        <CheckCookieComponent />
    </React.StrictMode>,
    document.getElementById('root')
);
