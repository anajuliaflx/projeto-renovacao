import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import './styles.css';

function Input({
    id,
    name,
    icon: Icon,
    type = "text",
    placeholder,
    as = "input",
    maxLength,
    required = false,
    children
}) {
    return (
        <div className="inputContainer">
            <div className="iconInputContainer">
                {Icon && <Icon className="icon" />}
                <Field
                    id={id}
                    name={name}
                    as={as}
                    type={type}
                    className="inputField"
                    placeholder={placeholder}
                    maxLength={maxLength}
                    required={required}
                    aria-label={placeholder}
                />
            </div>
            <ErrorMessage component="span" name={name} className="errorText" />
            {children}
        </div>
    );
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.elementType,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    maxLength: PropTypes.number,
    required: PropTypes.bool,
    children: PropTypes.node,
};

export default Input;