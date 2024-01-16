import React, {useState, useEffect} from 'react';
import TileGallery from './TileGallery';
import galleryIcon from '../../assets/media/galeria.png'

function GaleriaAdmin() {
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

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleGallerySubmit = () => {
       //zrobic zeby sie dodawała galeria
        closeModal();
        setNewGallery({ title: '', images: [], mainImage: null });
    };

    return (
        <div className="h-96" id="galeria">
            <div className="bg-white h-16 w-full"></div>
            <h1 className="text-3xl md:text-lg lg:text-3xl sm:text-base 2xl:text-6xl font-josefinsans text-text font-bold ml-5 mb-5 relative">Galeria</h1>
            <div className="overflow-x-auto overflow-y-hidden flex items-center">
                <div className="flex mt-10 mb-4">
                    <TileGallery title="Dodaj galerię" imageSrc={galleryIcon} marginLeft="20px" marginRight="20px" onClick={openModal} />
                    {galleryAlbums.map(album => (
                        <a key={album.id} href={`../../src/html/galeria.html?id=${album.id}`}>
                            <TileGallery title={album.title} imageSrc={`${album.folder_path}/${album.photos[0]}`} marginLeft="20px" marginRight="20px" />
                        </a>
                    ))}
                </div>
            </div>
          
            {showModal && (
        <div className="modal-overlay">
          <div className="modal flex flex-col">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2 style={{fontWeight:"bold", fontSize:"20px", marginLeft:"10px"}}>Wprowadź dane</h2>
            {/* Add form inputs for gallery title, images, and mainImage here */}
            <form>
              <label className='label flex flex-col ' style={{fontSize:"15px"}}>
                Tytuł galerii:
                <input type="text" value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} />
              </label>
              <h1 style={{fontSize:"15px", fontWeight:"bold", marginLeft:"10px"}}> Wybierz tło:</h1>
              <label className='label flex flex-col input-file file-button' style={{fontSize:"15px"}}>
                Wybierz plik
                <input type="file" accept=".jpg, .png, .jpeg, .tiff" multiple={false} />
                
              </label>
              <h1 style={{fontSize:"15px", fontWeight:"bold", marginLeft:"10px"}}> Dodaj zdjęcia:</h1>
              <label className='label flex flex-col input-file file-button' style={{fontSize:"15px"}}>
                Wybierz pliki
                <input  type="file" accept=".jpg, .png, .jpeg, .tiff" multiple={true}/>
                
              </label>

              <button className='accept-button' style={{marginLeft:"10px"}} type="button" onClick={handleGallerySubmit}>
                Dodaj
              </button>
            </form>
          </div>
        </div>
      )}
        </div>
    );
}

export default GaleriaAdmin;