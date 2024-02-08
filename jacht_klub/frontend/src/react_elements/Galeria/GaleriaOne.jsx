import React, {useState, useEffect} from 'react';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import Header from '../general/Header';
import SecondHeader from '../landing/SecondHeader';

function GaleriaOne() {
    const [galleryAlbum, setGalleryAlbum] = useState(null);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    useEffect(() => {
        // Fetch gallery album with id=1 from the API
        fetch(`http://localhost:3000/backend/gallery-album/${id}`)
            .then(response => response.json())
            .then(data => setGalleryAlbum(data[0]))
            .catch(error => console.error('Error fetching gallery album:', error));
    }, []);

    if (!galleryAlbum) {
        // Loading state or handle error
        return <div className="text-2xl">Nie ma galeri o takim ID</div>; // You might want to show a loading indicator
    }

    const renderPhotos = () => {
        return galleryAlbum.photos.map((photo, index) => (
            <img key={index} src={'../../' + galleryAlbum.folder_path + '/' + photo} style={{height: '200px', width: '400px'}} />
        ));
    };

    console.log(galleryAlbum);

    return (
        <div>
            <Header />

            <div className="flex flex-col justify-center items-center ">
                <h1 className="text-text text-5xl mt-20 mb-5 font-bold font-jaldi">{galleryAlbum.title}</h1>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-0">
                {galleryAlbum.photos.map((photo, index) => (
                    <img
                        key={index}
                        src={'../../' + galleryAlbum.folder_path + '/' + photo}
                        className="w-full md:w-auto lg:w-full"
                        style={{maxWidth: '600px', margin: 'auto'}}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-5">
                <a
                    href={`../../src/html/galeria.html?id=${galleryAlbum.id > 1 ? galleryAlbum.id - 1 : galleryAlbum.id}`}
                    className="flex items-center text-grey2 font-jaldi"
                >
                    <div className="mr-10">
                        <FaArrowLeft />
                    </div>
                    Poprzednia Galeria
                </a>
                <a href={`../../src/html/galeria.html?id=${Number(galleryAlbum.id) + Number(1)}`} className="flex items-center text-grey2 font-jaldi">
                    Następna Galeria
                    <div className="ml-10">
                        <FaArrowRight />
                    </div>
                </a>
            </div>
        </div>
    );
}

export default GaleriaOne;
