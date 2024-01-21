import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuickNews from './QuickNews';
import NavigationButton from '../general/NavigationButton';
import News from '../news/News';
import {FaArrowLeft, FaArrowRight, FaPlus} from 'react-icons/fa';

export default function LandingNewsAdmin() {
    const [articlesArray, setArticlesArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newsArray, setNewsArray] = useState([]);
    const [newArticle, setNewArticle] = useState({title: '', text: '', photo: ''});

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
    const openModal = () => {
        setShowModal(true);
    };

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

    const closeModal = () => {
        setShowModal(false);
    };

    const handleArticleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/backend/add_article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            if (response.ok) {
                console.log('Article added successfully!');
                // Optionally, you can fetch the updated list of articles after adding a new one.
                // For example, refetchArticles();
            } else {
                console.error('Error adding article:', await response.text());
            }
        } catch (error) {
            console.error('Error during article submission:', error);
        }

        closeModal();
        setNewArticle({title: '', text: '', photo: ''}); // Assuming date is the correct property name
    };

    return (
        <>
            <div id="aktualnosci">
                <h1 id="aktualnosci" className="mt-1 mb-20 text-4xl text-white"></h1>

                <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-5xl font-josefinsans text-text font-bold ml-10 mt-20">Aktualności</h1>

                <button className="file-button" style={{marginLeft: '40px', display: 'flex', alignItems: 'center'}} onClick={openModal}>
                    <FaPlus style={{marginRight: '5px'}} /> Dodaj nowy artykuł
                </button>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal flex flex-col">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <h2 style={{fontWeight: 'bold', fontSize: '20px', marginLeft: '10px'}}>Dodaj artykuł</h2>
                            <form>
                                <label className="label flex flex-col" style={{fontSize: '15px'}}>
                                    Tytuł artykułu:
                                    <input type="text" value={newArticle.title} onChange={e => setNewArticle({...newArticle, title: e.target.value})} />
                                </label>

                                <label className="label flex flex-col input-file file-button" style={{fontSize: '15px'}}>
                                    Treść artykułu:
                                    <textarea
                                        style={{color: 'black'}}
                                        value={newArticle.text}
                                        onChange={e => setNewArticle({...newArticle, text: e.target.value})}
                                    ></textarea>
                                </label>

                                <label className="label flex flex-col input-file file-button" style={{fontSize: '15px'}}>
                                    Zdjęcie:
                                    <div className="flex items-center">
                                        <h1 style={{fontSize: '15px', fontWeight: 'bold', marginLeft: '10px'}}> Dodaj zdjęcia:</h1>
                                        <label className="label flex flex-col input-file file-button" style={{fontSize: '15px'}}>
                                            Wybierz plik
                                            <input
                                                type="file"
                                                accept=".jpg, .png, .jpeg, .tiff"
                                                multiple={false}
                                                onChange={e =>
                                                    setNewArticle({...newArticle, photo: e.target.value.slice(e.target.value.toString().lastIndexOf('/') + 1)})
                                                }
                                            />
                                        </label>
                                    </div>
                                </label>

                                <button className="accept-button" style={{marginLeft: '10px'}} type="button" onClick={handleArticleSubmit}>
                                    Dodaj
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="bg-grey flex flex-col gap-20 mt-32">
                    {articlesArray.map(article => (
                        <News key={article.id} index={article.id} photo={`../../${article.photo}`} title={article.title} text={article.content.slice(0, 512)} />
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
