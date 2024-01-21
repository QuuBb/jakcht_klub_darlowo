import React, {useState, useEffect} from 'react';
import TileGallery from './TileGallery';
import galleryIcon from '../../assets/media/galeria.png';

function GaleriaAdmin() {
    const [galleryAlbums, setGalleryAlbums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newGallery, setNewGallery] = useState({title: '', path: ''});

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
    const handleDirectoryChange = async e => {
        try {
            let directoryPath = e.target.files[0].webkitRelativePath;
            directoryPath = 'gallery/' + directoryPath.slice(0, directoryPath.indexOf('/'));

            // Update the state or perform any other action with the directoryPath
            console.log(directoryPath);
            setNewGallery({...newGallery, path: directoryPath});
        } catch (error) {
            console.error('Error selecting directory:', error);
        }
    };

    const handleGallerySubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/backend/add_gallery_album', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGallery),
            });

            if (response.ok) {
                console.log('Gallery added successfully');
            } else {
                console.error('Error adding gallery:', response.statusText);
            }

            closeModal();
            setNewGallery({title: '', path: ''});
        } catch (error) {
            console.error('Error during fetch:', error);
        }
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
                        <h2 style={{fontWeight: 'bold', fontSize: '20px', marginLeft: '10px'}}>Wprowadź dane</h2>
                        {/* Add form inputs for gallery title, images, and mainImage here */}
                        <form>
                            <label className="label flex flex-col " style={{fontSize: '15px'}}>
                                Tytuł galerii:
                                <input type="text" value={newGallery.title} onChange={e => setNewGallery({...newGallery, title: e.target.value})} />
                            </label>
                            <h1 style={{fontSize: '15px', fontWeight: 'bold', marginLeft: '10px'}}>Dodaj zdjęcia:</h1>
                            <label className="label flex flex-col input-file file-button" style={{fontSize: '15px'}}>
                                Wybierz ścieżkę
                                <label className="label flex flex-col input-file file-button" style={{fontSize: '15px'}}>
                                    Wybierz ścieżkę
                                    <input type="file" id="filepicker" name="fileList" webkitdirectory="true" onChange={handleDirectoryChange} />
                                </label>
                            </label>

                            <button className="accept-button" style={{marginLeft: '10px'}} type="button" onClick={handleGallerySubmit}>
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
