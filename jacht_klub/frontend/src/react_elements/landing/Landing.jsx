import React, {useEffect, useRef, useState} from 'react';
import HeaderLanding from './HeaderLanding';
import SecondHeader from './SecondHeader';
import LandingNews from './LandingNews';
import LandingAbout from './LandingAbout';
import LandingNewsAdmin from './LandingNewsAdmin';
import Crew from './Crew';
import Regaty from './Regaty';
import Galeria from './Galeria';
import Kontakt from './Contact';
import morze from '../../assets/media/firefly2.png';
import {isMobile} from 'react-device-detect';
import _debounce from 'lodash/debounce';
import background from '../../assets/media/background.webp';
import GaleriaAdmin from './GaleriaAdmin';

export default function BackgroundLanding() {
    const [isHeaderLandingVisible, setHeaderLandingVisible] = useState(true);
    const [isAuthTokenSet, setAuthTokenSet] = useState(false);
    const landingPhotoRef = useRef(null);
    const secondHeaderRef = useRef(null);

    const updateVisibility = _debounce(() => {
        const screenWidth = window.innerWidth;
        const isSmallScreen = screenWidth < 790;
        setHeaderLandingVisible(!isSmallScreen);
    }, 200);

    const mainContainerStyle = {
        backgroundImage: `url(${morze})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '200vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    };

    const headerLandingStyles = {
        transition: 'opacity 0.3s ease-in-out',
        opacity: isHeaderLandingVisible ? 1 : 0,
    };

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const response = await fetch('http://localhost:3000/cookie_check.php', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthTokenSet(!!data.auth_token); // Set isAuthTokenSet based on the presence of auth_token
                } else {
                    setAuthTokenSet(false);
                }
            } catch (error) {
                console.error('Error checking auth token:', error.message);
                setAuthTokenSet(false);
            }
        };

        const landingPhotoObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setHeaderLandingVisible(true);
                        checkAuthToken();
                    } else {
                        setHeaderLandingVisible(false);
                    }
                });
            },
            {threshold: 0.5}
        );

        landingPhotoObserver.observe(landingPhotoRef.current);

        // Initial check
        updateVisibility();

        // Event listener for window resize
        window.addEventListener('resize', updateVisibility);

        return () => {
            landingPhotoObserver.disconnect();
            window.removeEventListener('resize', updateVisibility);
        };
    }, []);

    return (
        <>
            <>
                {isHeaderLandingVisible && (
                    <div style={headerLandingStyles}>
                        <HeaderLanding />
                    </div>
                )}
                {!isHeaderLandingVisible && <SecondHeader ref={secondHeaderRef} />}

                <div
                    ref={landingPhotoRef}
                    className="landingPhoto w-full h-screen bg-background bg-cover bg-center relative mb-0 mt-0"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <div className="landing-title absolute top-1/2 left-1/2 font-josefinsans text-text animate__animated animate__slideInLeft">
                        <h1 className=" landing-title font-jaldi">
                            Jacht Klub <br /> Królewskiego Miasta Darłowo
                        </h1>
                    </div>
                </div>

                <LandingAbout />
                <Crew />
                <LandingNews />
                <div className="mt-20">{isAuthTokenSet ? <GaleriaAdmin /> : <Galeria />}</div>
                <div style={{...mainContainerStyle, height: isHeaderLandingVisible ? '200vh' : 'auto'}}>
                    <Regaty />
                    <Kontakt />
                </div>
            </>
        </>
    );
}
