import React from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import './styles.css';

const Select = ({
    id,
    name,
    options,
    icon: Icon,
    required = false,
    placeholder = ""
}) => {
    return (
        <div className="selectContainer">
            <div className="iconSelectContainer">
                {Icon && <Icon className="icon" />}
                <Field as="select" id={id} name={name} className="selectField" required={required}>
                    <option value="" disabled selected>{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Field>
            </div>
            <ErrorMessage name={name} component="span" className="errorText" />
        </div>
    );
};

Select.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    icon: PropTypes.elementType,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
};

export default Select;