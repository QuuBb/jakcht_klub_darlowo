// Input.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const InputComponent = ({id, placeholder, label, customClass, value, onChange, type}) => {
    return (
        <div className={`input__wrapper ${customClass}`}>
            <input
                id={id}
                className={`input__field ${customClass}`}
                placeholder={placeholder}
                style={{width: '100%', boxSizing: 'border-box'}}
                value={value}
                onChange={onChange}
                type={type}
            />
            <label htmlFor={id} className={`input__label ${customClass}`}>
                {label}
            </label>
        </div>
    );
};

InputComponent.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    customClass: PropTypes.string,
};

export default InputComponent;
