import React from 'react';
import PropTypes from 'prop-types';

function TileGallery({ title, imageSrc, altText, marginLeft, marginRight, onClick }) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };
    return (
        <article className="gallery" style={{marginLeft, marginRight, position: 'relative'}} onClick={handleClick}>
            <div
                className="gallery__frame"
                style={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    border: '2px solid #fff',
                    boxSizing: 'border-box',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1',
                }}
            ></div>
            <img className="gallery__background" src={imageSrc} width="300" height="250" alt={altText} style={{zIndex: '0'}} />
            <div className="gallery__content | flow">
                <div className="gallery__content--container | flow">
                    <h2
                        className="gallery__title text-white text-xl 2xl:text-4xl"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            margin: '0',
                            zIndex: '1',
                        }}
                    >
                        {title}
                    </h2>
                </div>
            </div>
        </article>
    );
}

TileGallery.propTypes = {
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    marginLeft: PropTypes.string,
    marginRight: PropTypes.string,
    onClick: PropTypes.func,
};

export default TileGallery;
