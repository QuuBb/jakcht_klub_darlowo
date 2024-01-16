import React from 'react';
import PropTypes from 'prop-types';

function Member({ title,  textWithoutList, imageSrc, altText, marginLeft, marginRight }) {
  return (
    <article className="card" style={{ marginLeft, marginRight }}>
      <img
        className="card__background"
        src={imageSrc}
        width="300"
        height="250"
        alt={altText}
      />
      <div className="card__content | flow">
        <div className="card__content--container | flow">
        <h2 className="card__title text-white text-base sm:text-l md:text-l lg:text-xl 2xl:text-4xl font-jaldi">
  {title}
</h2>
        
            <p className="card__description  text-white text-l 2xl:text-2xl" >
              {textWithoutList}
            </p>
        </div>
      </div>
    </article>
  );
}

Member.propTypes = {
  title: PropTypes.string.isRequired,
  textWithoutList: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
};

export default Member;
