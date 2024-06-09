import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateButton = (props) => {
    const { width, height, onButtonClick, disabled, label, color, icon } = props;
    const [hoverStyles, setHoverStyles] = useState({});

    const sizeStyles = {
        width: width || 'auto',
        height: height || 'auto',
    };

    const backgroundColor = disabled ? 'gray' : color || '#FFC107'; 
    const cursorStyle = disabled ? 'not-allowed' : 'pointer';

    const handleMouseMove = (e) => {
        if (!disabled) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setHoverStyles({
                background: `radial-gradient(circle at ${x}px ${y}px, #FFD54F, ${backgroundColor})`,
            });
        }
    };

    const handleMouseLeave = () => {
        if (!disabled) {
            setHoverStyles({
                background: backgroundColor,
            });
        }
    };

    return (
        <div
            onClick={disabled ? null : onButtonClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`flex justify-center items-center pt-2 pb-3 pl-7 pr-7 rounded-3xl text-white leading-thigh ${disabled ? 'cursor-not-allowed' : 'btn-hover'}`}
            style={{ ...sizeStyles, backgroundColor: backgroundColor, cursor: cursorStyle, ...hoverStyles }}>
            {icon && <img src={icon} alt="icon" className="mr-2" style={{ width: '1em', height: '1em', marginTop: '3px' }} />}
            {label}
        </div>
    );
};

export default UpdateButton;

UpdateButton.propTypes = {
    label: PropTypes.string,
    onButtonClick: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    icon: PropTypes.string,
};
