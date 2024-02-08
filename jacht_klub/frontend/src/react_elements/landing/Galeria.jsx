import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import TileGallery from './TileGallery';
import galleryIcon from '../../assets/media/galeria.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Galeria() {
    const [galleryAlbums, setGalleryAlbums] = useState([]);

    useEffect(() => {
        // Fetch gallery albums from the API
        fetch('http://localhost:3000/backend/gallery-albums')
            .then(response => response.json())
            .then(data => setGalleryAlbums(data))
            .catch(error => console.error('Error fetching gallery albums:', error));
    }, []);

    const NextArrow = ({onClick}) => (
        <div className="slick-arrow slick-next" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} style={{color: 'black'}} />
        </div>
    );

    const PrevArrow = ({onClick}) => (
        <div className="slick-arrow slick-prev" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} style={{color: 'black'}} />
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Ustaw ilość widocznych miniatur w jednym czasie
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="h-96" id="galeria">
            <div className="bg-white h-16 w-full"></div>
            <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-6xl font-josefinsans text-text font-bold ml-5 mb-5 relative">Galeria</h1>
            <div className="overflow-x-auto overflow-y-hidden relative">
                <Slider {...settings}>
                    {galleryAlbums.map(album => (
                        <div key={album.id}>
                            <a href={`../../src/html/galeria.html/${album.id}`}>
                                <TileGallery title={album.title} imageSrc={`${album.folder_path}/${album.photos}`} marginLeft="20px" marginRight="20px" />
                            </a>
                            <NextArrow />
                            <PrevArrow />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Galeria;
