import React, {useState, useEffect} from 'react';
import TileGallery from './TileGallery';
import galleryIcon from '../../assets/media/galeria.png'

function Galeria() {
    const [galleryAlbums, setGalleryAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newGallery, setNewGallery] = useState({ title: '', images: [], mainImage: null });

    useEffect(() => {
        // Fetch gallery albums from the API
        fetch('http://localhost:3000/backend/gallery-albums')
            .then(response => response.json())
            .then(data => setGalleryAlbums(data))
            .catch(error => console.error('Error fetching gallery albums:', error));
    }, []);

   

    return (
        <div className="h-96" id="galeria">
            <div className="bg-white h-16 w-full"></div>
            <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-6xl font-josefinsans text-text font-bold ml-5 mb-5 relative">Galeria</h1>
            <div className="overflow-x-auto overflow-y-hidden flex items-center">
                <div className="flex mt-10 mb-4">
                    
                    {galleryAlbums.map(album => (
                        <a key={album.id} href={`../../src/html/galeria.html?id=${album.id}`}>
                            <TileGallery title={album.title} imageSrc={`${album.folder_path}/${album.photos[0]}`} marginLeft="20px" marginRight="20px" />
                        </a>
                    ))}
                </div>
            </div>
          
     
        </div>
    );
}

export default Galeria;