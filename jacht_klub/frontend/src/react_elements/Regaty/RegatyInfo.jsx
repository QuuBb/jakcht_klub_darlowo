import React, {useState, useEffect} from 'react';
import Header from '../general/Header';
import InputComponent from './Input';
import jezioro from '../../assets/media/bukowo.webp';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function RegatyInfo() {
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

    const handleInputChange = e => {
        const {id, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleWyslij = async e => {
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
            console.log(JSON.stringify(formData));

            setWyslano(true);
        } catch (error) {
            console.error('Błąd podczas wysyłania zapytania POST:', error);
        }
    };

    useEffect(() => {}, [wyslano]);

    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const handleMapClick = e => {
            console.log('Map clicked:', e.latlng);
            const newMarker = e.latlng;
            setMarkers(prevMarkers => [...prevMarkers, newMarker]);
        };

        // Attach click event listener to the map
        if (map) {
            map.on('click', handleMapClick);
        }

        // Detach the event listener when the component is unmounted
        return () => {
            if (map) {
                map.off('click', handleMapClick);
            }
        };
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
                <div className="flex">
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
                                marginLeft: '3%',
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
                                    <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '8%'}}>
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
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="typ"
                                                placeholder="input__field"
                                                label="Typ"
                                                customClass="input__field-margin"
                                                value={formData.typ}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="oznaczenie"
                                                placeholder="input__field"
                                                label="Oznaczenie na żaglu"
                                                customClass="input__field-margin"
                                                value={formData.oznaczenie}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="dlugosc"
                                                placeholder="input__field"
                                                label="Długość całkowita jachtu L (m): "
                                                customClass="input__field-margin"
                                                value={formData.dlugosc}
                                                onChange={handleInputChange}
                                                type={'number'}
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
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="stopien"
                                                placeholder="input__field"
                                                label="Stopień"
                                                customClass="input__field-margin"
                                                value={formData.stopien}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="rok"
                                                placeholder="input__field"
                                                label="Rok urodzenia"
                                                customClass="input__field-margin"
                                                value={formData.rok}
                                                onChange={handleInputChange}
                                                type={'date'}
                                            />
                                            <InputComponent
                                                id="adres"
                                                placeholder="input__field"
                                                label="Adres zamieszkania"
                                                customClass="input__field-margin"
                                                value={formData.adres}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="nr"
                                                placeholder="input__field"
                                                label="Numer telefonu"
                                                customClass="input__field-margin"
                                                value={formData.nr}
                                                onChange={handleInputChange}
                                                type={'tel'}
                                            />
                                            <InputComponent
                                                id="klub"
                                                placeholder="input__field"
                                                label="Klub"
                                                customClass="input__field-margin"
                                                value={formData.klub}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                            <InputComponent
                                                id="zaloga"
                                                placeholder="input__field"
                                                label="Załoga"
                                                customClass="input__field-margin"
                                                value={formData.zaloga}
                                                onChange={handleInputChange}
                                                type={'text'}
                                            />
                                        </div>

                                        <div className="items-center mx-auto">
                                            <button
                                                onClick={handleWyslij}
                                                className={`font-jaldi text-white bg-text focus:outline-none rounded-lg py-2 px-4 lg:text-lg xl:text-xl 2xl:text-2xl transition-all ${
                                                    wyslano ? 'bg-green-500' : 'hover:bg-yellow-500'
                                                }`}
                                                style={{width: '200px'}}
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

                    <div
                        style={{
                            width: '48%', // Adjust as needed
                            marginLeft: '1%',
                            marginRight: '2%',
                            marginTop: '5%',
                        }}
                    >
                        <div>
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
                                <MapContainer center={[54.350215, 16.284053]} zoom={13} style={{width: '100%', height: '100%'}} whenCreated={setMap}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {markers.map((marker, index) => (
                                        <Marker key={index} position={marker}>
                                            <Popup>
                                                <div>
                                                    <h2>Marker {index + 1}</h2>
                                                    <p>Lat: {marker.lat.toFixed(6)}</p>
                                                    <p>Lng: {marker.lng.toFixed(6)}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegatyInfo;
