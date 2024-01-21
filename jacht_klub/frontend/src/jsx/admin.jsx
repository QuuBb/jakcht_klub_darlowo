// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsPage from '../react_elements/news/NewsPage';
import '../styles/index.css';
import Login from '../Admin/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Login />
    </React.StrictMode>
);
