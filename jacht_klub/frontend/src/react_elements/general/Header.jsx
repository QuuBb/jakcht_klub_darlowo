import React, { useState } from 'react';
import '../../styles/SecondHeader.css'
import close from '../../assets/media/close.svg'
import burger from '../../assets/media/burger-menu.svg'
import logo from '../../assets/media/logo.png'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth',
        });
    }
};

  return (
   
      <div className="menu__wrapper">
        <div className="menu__bar">
        <a href="../../index.html">
          <img  title="Logo" src={logo} alt="Logo Jacht Klubu" className=" logo bg-text rounded-full p-1 mx-6 my-2 w-14">
            {/* Your SVG code goes here */}
          </img>
          </a>
          <img
            className="menu-icon"
            src={isMobileMenuOpen ? close : burger}
            title="Burger Menu"
            alt="Burger Menu"
            onClick={toggleMenu}
          />
          <ul className={`navigation ${isMobileMenuOpen ? 'navigation--mobile' : ''}`}>
            <li>
            <a
  href="../../index.html#landingAbout"
  className='font-jaldi'
  title="O nas"
>
  O NAS
</a>
            </li>
            <li>
              <a href="../../index.html" onClick={() => scrollToSection('aktualnosci')} className='font-jaldi' title="Aktualności">
              AKTUALNOŚCI
              </a>
            </li>
            <li>
              <a href="../../index.html" onClick={() => scrollToSection('galeria')} className='font-jaldi' title="Galeria">
                GALERIA
              </a>
            </li>
            <li>
              <a href="../../index.html" onClick={() => scrollToSection('regaty')} className='font-jaldi 'title="Regaty">
                REGATY
              </a>
            </li>
            <li>
              <a href="../../index.html" onClick={() => scrollToSection('kontakt')} className='font-jaldi' title="Kontakt">
                KONTAKT
              </a>
            </li>
            <li>
            <ul className=" menu">
            <li>
    <a href="#" className='font-jaldi'>DOKUMENTY</a>
    
    <ul>
    <li><a href="../../documents/regulamin.docx" target="_blank" rel="noopener noreferrer" download>Regulamin regat</a></li>
              <li><a href="../../documents/info.docx" target="_blank" rel="noopener noreferrer" download>Informacje dla kapitanów 2</a></li>
              <li><a href="../../documents/zgloszenie.doc" target="_blank" rel="noopener noreferrer" download>Zgłoszenie do regat</a></li>
              <li><a href="../../documents/STATUT.docx"target="_blank" rel="noopener noreferrer" download>Statut</a></li>
              <li><a href="../../documents/Deklaracja.docx"target="_blank" rel="noopener noreferrer" download>Deklaracja członkostwa</a></li>
              <li><a href="../../documents/Decyzja.jpg"target="_blank" rel="noopener noreferrer" download>Decyzja</a></li>
    </ul>
  </li>
</ul>
            </li>
            {/* <div className='-ml-20 text-center'>
            <WeatherWidget/>
            </div> */}
          </ul>
        
        </div>
      </div>
    
  );
};

export default Header;
