import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Button({ id, label, to, type = "button", onClick }) {
    if (to) {
        return (
            <Link to={to}>
                <button id={id} type={type} className="componentButton" onClick={onClick}>
                    {label}
                </button>
            </Link>
        );
    }

    return (
        <button id={id} type={type} className="componentButton" onClick={onClick}>
            {label}
        </button>
    );
}

export default Button;