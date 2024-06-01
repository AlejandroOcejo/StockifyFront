import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RemoveButton = (props) => {
    const { width, height, onButtonClick, disabled, label, color } = props;
    const [hoverStyles, setHoverStyles] = useState({});

    const sizeStyles = {
        width: width || 'auto',
        height: height || 'auto',
    };

    const backgroundColor = disabled ? 'gray' : color || '#e3342f'; // Cambiado a rojo

    const handleMouseMove = (e) => {
        if (!disabled) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setHoverStyles({
                background: `radial-gradient(circle at ${x}px ${y}px, #cc1f1a, ${backgroundColor})`, // Cambiado a tonos de rojo
            });
        }
    };

    const handleMouseLeave = () => {
        setHoverStyles({
            background: backgroundColor,
        });
    };

    return (
        <div
            onClick={disabled ? null : onButtonClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`flex justify-center items-center pt-2 pb-3 pl-7 pr-7 rounded-3xl text-white leading-thigh ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
            style={{ ...sizeStyles, backgroundColor: backgroundColor, ...hoverStyles }}>
            {label}
        </div>
    );
};

export default RemoveButton;

RemoveButton.propTypes = {
    label: PropTypes.string,
    onButtonClick: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
};
