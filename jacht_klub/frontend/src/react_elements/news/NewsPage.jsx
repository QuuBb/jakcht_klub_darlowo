import React, {useState, useEffect} from 'react';
import Header from '../general/Header';
import News from './News';
import LandingNewsAdmin from '../landing/LandingNewsAdmin';

const NewsPage = () => {
    const [newsArray, setNewsArray] = useState([]);
    const [isAuthTokenSet, setAuthToken] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/backend/articles');
                const data = await response.json();
                setNewsArray(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors appropriately
            }
        };

        const checkAuthToken = async () => {
            try {
                const response = await fetch('http://localhost:3000/cookie_check.php', {
                    method: 'GET',
                    credentials: 'include', // include credentials (cookies) in the request
                });

                if (response.ok) {
                    const result = await response.json();
                    setAuthToken(result.auth_token);
                } else {
                    console.error('Error checking auth token:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchData();
        checkAuthToken();
    }, []);

    return (
        <>
            <Header />
            {isAuthTokenSet ? (
                <LandingNewsAdmin />
            ) : (
                <>
                    <div className="bg-grey flex flex-col gap-20 mt-32">
                        {newsArray.map(article => (
                            <News
                                key={article.id}
                                index={article.id}
                                photo={`../../${article.photo}`}
                                title={article.title}
                                text={article.content.slice(0, 512)}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default NewsPage;
