import React, {useEffect, useState} from 'react';

const CheckCookieComponent = () => {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        const checkCookie = async () => {
            try {
                const response = await fetch('http://localhost:3000/cookie_check.php', {
                    credentials: 'include', // Include credentials (cookies) in the request
                });

                if (response.ok) {
                    const data = await response.json();
                    setCookieValue(data.auth_token || 'Auth Token not set');
                } else {
                    console.error('Error checking cookie:', response.statusText);
                }
            } catch (error) {
                console.error('Error checking cookie:', error.message);
            }
        };

        checkCookie();
    }, []);
};

export default CheckCookieComponent;
