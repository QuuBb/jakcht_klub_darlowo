import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuickNews from './QuickNews';
import NavigationButton from '../general/NavigationButton';
import {FaArrowLeft, FaArrowRight, FaPlus} from 'react-icons/fa';

export default function LandingNews() {
    const [articlesArray, setArticlesArray] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/backend/articles')
            .then(response => response.json())
            .then(data => {
                setArticlesArray(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div id="aktualnosci">
                <h1 id="aktualnosci" className="mt-1 mb-20 text-4xl text-white"></h1>

                <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-5xl font-josefinsans text-text font-bold ml-10 mt-20">Aktualności</h1>

                <div className="bg-white flex flex-col justify-center gap-10">
                    {articlesArray.slice(0, 2).map(article => (
                        <QuickNews
                            key={article.id}
                            index={article.id} // Make sure to use a unique key when mapping over elements
                            title={article.title}
                            description={article.content.slice(0, 256)}
                            photo={`${article.photo}`}
                            reverse={article.id % 2 === 0 ? 0 : 1} // Alternate the 'reverse' prop
                        />
                    ))}
                </div>

                <div className="flex items-center ml-20 hover:scale-105 transition-transform">
                    <a
                        href="../../src/html/news.html"
                        id="przejdzButton"
                        className="text-text mt-2 ml-2 md:text-m lg:text-l sm:text-base 2xl:text-xl font-jaldi font-bold "
                    >
                        przejdź do starszych artykułów
                    </a>
                    <FaArrowRight className="ml-1 mt-2 text-text " />
                </div>
            </div>
        </>
    );
}
