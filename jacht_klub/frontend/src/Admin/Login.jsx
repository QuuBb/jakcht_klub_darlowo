import React, {useState, useEffect} from 'react';

const LoginForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkCookie = async () => {
            try {
                const response = await fetch('http://localhost:3000/cookie_check.php', {
                    credentials: 'include', // Include credentials (cookies) in the request
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsLoggedIn(true);
                } else {
                    console.error('Error checking cookie:', response.statusText);
                }
            } catch (error) {
                console.error('Error checking cookie:', error.message);
            }
        };

        //checkCookie();
    }, []);

    useEffect(() => {}, []);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString(),
                credentials: 'include',
            });

            if (response.ok) {
                console.log(document.cookie);

                // Redirect to index.html on successful login
                window.location.href = '../../index.html'; // Adjust the URL accordingly
            } else {
                // Handle unsuccessful login
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Invalid username or password');
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    const handleLogout = () => {
        // Clear the 'auth_token' cookie
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Update the component state to indicate logout
        setIsLoggedIn(false);
    };

    return (
        <div className="login-container" style={{marginTop: '10%'}}>
            <div>
                {isLoggedIn ? (
                    <>
                        <h2 style={{fontWeight: 'bold', textAlign: 'center', margin: '0 auto', marginBottom: '10px'}}>
                            Witaj! zalogowałeś się do panelu administratora.
                        </h2>

                        <button onClick={handleLogout} className="login-button">
                            Wyloguj
                        </button>
                    </>
                ) : (
                    <>
                        <h2 style={{fontWeight: 'bold', textAlign: 'center', margin: '0 auto', marginBottom: '10px'}}>
                            Zaloguj się do panelu administracyjnego
                        </h2>

                        {errorMessage && <p style={{color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>}

                        <form onSubmit={handleLogin}>
                            <label htmlFor="username" style={{fontWeight: 'bold'}}>
                                Login:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="login-input"
                            />
                            <br />

                            <label htmlFor="password" style={{fontWeight: 'bold'}}>
                                Hasło:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="login-input"
                            />
                            <br />

                            <button type="submit" className="login-button">
                                Zaloguj się
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
