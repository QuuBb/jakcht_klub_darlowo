import React, {useState, useEffect} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {useParams} from 'react-router-dom';
import Header from '../general/Header';
import regaty2023 from '../../assets/media/trzyperły.jpeg';
import SecondHeader from '../landing/SecondHeader';

function Article() {
    const [article, setArticle] = useState(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    useEffect(() => {
        // Fetch article based on the ID from the URL
        fetch(`http://localhost:3000/backend/article?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setArticle(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors appropriately
            });
    }, [id]);

    if (!article) {
        return <div className="text-2xl">Nie ma artykułu o takim ID</div>; // You might want to show a loading indicator
    }

    return (
        <div>
            <Header />

            <div className="flex flex-col justify-center items-center">
                <h1 className="text-text text-5xl mt-20 mb-5 font-jaldi ">{article.title}</h1>
                <p className="mb-10 text-md">{article.published.slice(0, article.published.indexOf(' '))}</p>
                <img src={`../../../${article.photo}`} style={{height: '20em', width: '40em', marginBottom: '60px'}} alt={article.title} />
                <p className="text-justify ml-5 mr-5 font-jaldi 2xl:text-2xl w-3/4">{article.content}</p>
            </div>

            {/* Additional content (e.g., images) here */}

            <div className="flex justify-between mt-5">
                <a href={`../../src/html/article.html?id=${article.id > 1 ? article.id - 1 : article.id}`} className="flex items-center text-grey2 font-jaldi">
                    <div className="mr-10 ">
                        <FaArrowLeft />
                    </div>
                    Poprzedni Artykuł
                </a>
                <a href={`../../src/html/article.html?id=${Number(article.id) + Number(1)}`} className="flex items-center text-grey2 font-jaldi">
                    Następny Artykuł
                    <div className="ml-10">
                        <FaArrowRight />
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Article;
