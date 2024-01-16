import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuickNews from './QuickNews';
import NavigationButton from '../general/NavigationButton';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

export default function LandingNewsAdmin() {
    const [articlesArray, setArticlesArray] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newArticle, setNewArticle] = useState({ title: '', text: '', data:'' });

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

    const closeModal = () => {
        setShowModal(false);
    };

    const handleArticleSubmit = () => {
       //zrobic zeby sie dodawała galeria
        closeModal();
        setNewArticle({ title: '', text: '', data:''});
    };

    return (
        <>
            <div id="aktualnosci">
                <h1 id="aktualnosci" className="mt-1 mb-20 text-4xl text-white"></h1>
                
                <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-5xl font-josefinsans text-text font-bold ml-10 mt-20">Aktualności</h1>
                
                <button className='file-button' style={{ marginLeft: "40px", display: "flex", alignItems: "center" }} onClick={openModal}>
  <FaPlus style={{ marginRight: "5px" }} /> Dodaj nowy artykuł
</button>

{showModal && (
  <div className="modal-overlay">
    <div className="modal flex flex-col">
      <span className="close" onClick={closeModal}>
        &times;
      </span>
      <h2 style={{fontWeight:"bold", fontSize:"20px", marginLeft:"10px"}}>Dodaj artykuł</h2>
      <form>
        <label className='label flex flex-col' style={{fontSize:"15px"}}>
          Tytuł artykułu:
          <input type="text" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} />
        </label>

        <label className='label flex flex-col input-file file-button' style={{fontSize:"15px"}}>
          Treść artykułu:
          <textarea style={{color:"black"}}value={newArticle.text} onChange={(e) => setNewArticle({ ...newArticle, text: e.target.value })}></textarea>
        </label>

        <label className='label flex flex-col input-file file-button' style={{ fontSize: "15px" }}>
  Data:
  <div className="flex items-center"> {/* Nowy div dla wyświetlenia daty obok napisu */}
    <span>{newArticle.date ? newArticle.date.toISOString().split('T')[0] : ''}</span> {/* Wyświetlanie daty */}
    <DatePicker
      selected={newArticle.date}
      onChange={(date) => setNewArticle({ ...newArticle, date })}
      dateFormat="yyyy-MM-dd"
      isClearable
    />
  </div>
</label>

        <button className='accept-button' style={{marginLeft:"10px"}} type="button" onClick={handleArticleSubmit}>
          Dodaj
        </button>
      </form>
    </div>
  </div>
)}

                

                <div className="bg-white flex flex-col justify-center gap-10">
                    {articlesArray.slice(0, 2).map(article => (
                        <QuickNews
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
