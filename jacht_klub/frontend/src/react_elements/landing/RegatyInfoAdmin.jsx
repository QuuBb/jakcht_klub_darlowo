import React, { useState, useEffect } from 'react';
import Header from '../general/Header';
import InputComponent from './Input';
import jezioro from '../../assets/media/bukowo.webp';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const RegatyInfoAdmin = () => {
    const [wyslano, setWyslano] = useState(false);
    const [formData, setFormData] = useState({
        nazwa: '',
        typ: '',
        oznaczenie: '',
        dlugosc: '',
        sternik: '',
        stopien: '',
        rok: '',
        adres: '',
        nr: '',
        klub: '',
        zaloga: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleWyslij = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/backend/crew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log('Server response:', response);

            setWyslano(true);
        } catch (error) {
            console.error('Błąd podczas wysyłania zapytania POST:', error);
        }
    };

    useEffect(() => {
       
    }, [wyslano]);

    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
          // Get the LatLng of the marker
          const markerLatLng = [54.37086407145514, 16.316519484490588];
    
          // Fly to the marker's location
          map.flyTo(markerLatLng, 14, {
            duration: 2, // Animation duration in seconds
          });
        }
      }, [map]);

    return (
        <>
          <div
                className="flex"
                style={{
                    backgroundImage: `url(${jezioro})`,
                    backgroundSize: 'cover',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                 <Header />
                <div className='flex'>
                 <form
                    style={{
                        width: '48%', 
                        marginLeft: '2%',
                        marginRight: '1%',
                    }}
                >
           
          
                <div
                    style={{
                        display: 'flex',
                        
                        margin: 'auto',
                        marginTop: '6%',
                        marginBottom: '3%',
                        marginLeft:"3%"
                    }}
                >
                    <div
                        style={{
                            width: '600px',
                            height: '1310px',
                            background: 'white',
                            border: '10px solid transparent',
                            backgroundClip: 'padding-box',
                            borderImage: `linear-gradient(to bottom, #30415D, #566B8C) 1`,
                            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            zIndex: 1,
                            marginTop: '5%',
                            
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    textAlign: 'center',
                                    color: '#E5CE00',
                                    fontSize: '36px',
                                    marginTop: '5%',
                                    fontFamily: 'jaldi',
                                }}
                            >
                                Regaty 2024
                            </h1>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    color: 'grey',
                                    fontFamily: 'jaldi',
                                }}
                            >
                                Wypełnij poniższy formularz, aby zapisać
                                <br />
                                swoją załogę do uczestnictwa w regatach 2024
                            </h2>
                            <div className="items-center"></div>
                            <div style={{ marginLeft: '10%', marginRight: '10%', marginTop: '8%' }}>
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        margin: '10px 0',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <p className="font-jaldi text-2xl font-bold mb-6 text-yellow text-center hover:text-3xl transition-all">
                                        Informacje o jachcie
                                    </p>
                                    <InputComponent
                                        id="nazwa"
                                        placeholder="input__field"
                                        label="Nazwa"
                                        customClass="input__field-margin"
                                        value={formData.nazwa}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="typ"
                                        placeholder="input__field"
                                        label="Typ"
                                        customClass="input__field-margin"
                                        value={formData.typ}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="oznaczenie"
                                        placeholder="input__field"
                                        label="Oznaczenie na żaglu"
                                        customClass="input__field-margin"
                                        value={formData.oznaczenie}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="dlugosc"
                                        placeholder="input__field"
                                        label="Długość całkowita jachtu L (m): "
                                        customClass="input__field-margin"
                                        value={formData.dlugosc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        padding: '20px',
                                        borderRadius: '8px',
                                        margin: '10px 0',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <p className="font-jaldi text-2xl font-bold mb-6 text-yellow text-center hover:text-3xl transition-all">
                                        Informacje o załodze
                                    </p>
                                    <InputComponent
                                        id="sternik"
                                        placeholder="input__field"
                                        label="Sternik Jachtu"
                                        customClass="input__field-margin"
                                        value={formData.sternik}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="stopien"
                                        placeholder="input__field"
                                        label="Stopień"
                                        customClass="input__field-margin"
                                        value={formData.stopien}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="rok"
                                        placeholder="input__field"
                                        label="Rok urodzenia"
                                        customClass="input__field-margin"
                                        value={formData.rok}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="adres"
                                        placeholder="input__field"
                                        label="Adres zamieszkania"
                                        customClass="input__field-margin"
                                        value={formData.adres}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="nr"
                                        placeholder="input__field"
                                        label="Numer telefonu"
                                        customClass="input__field-margin"
                                        value={formData.nr}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="klub"
                                        placeholder="input__field"
                                        label="Klub"
                                        customClass="input__field-margin"
                                        value={formData.klub}
                                        onChange={handleInputChange}
                                    />
                                    <InputComponent
                                        id="załoga"
                                        placeholder="input__field"
                                        label="Załoga"
                                        customClass="input__field-margin"
                                        value={formData.zaloga}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="items-center mx-auto">
                                    <button
                                        onClick={handleWyslij}
                                        className={`font-jaldi text-white bg-text focus:outline-none rounded-lg py-2 px-4 lg:text-lg xl:text-xl 2xl:text-2xl transition-all ${
                                            wyslano ? 'bg-green-500' : 'hover:bg-yellow-500'
                                        }`}
                                        style={{ width: '200px' }}
                                        disabled={wyslano}
                                    >
                                        {wyslano ? 'Wysłano!' : 'Wyślij zgłoszenie'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            
        </form>

        <div style={{
                        width: '48%', // Adjust as needed
                        marginLeft: '1%',
                        marginRight: '2%',
                        marginTop:'5%'
                    }}>

        <div >

<div
                        style={{
                            width: '600px',
                            height: '1310px',
                            
                            border: '10px solid transparent',
                            backgroundClip: 'padding-box',
                            borderImage: `linear-gradient(to bottom, #30415D, #566B8C) 1`,
                            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            zIndex: 1,
                            
                            
                        }}
                    >
                        <MapContainer
     center={[54.350215, 16.284053]}
    zoom={13}
    style={{ width: '100%', height: '1290px' }}
    scrollWheelZoom={false}
    whenCreated={setMap}
  >
   <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

</MapContainer>
        



        </div>
        </div>
        </div>
        </div>
        </div>
        
       

        </>

    );
};

export default RegatyInfoAdmin;
