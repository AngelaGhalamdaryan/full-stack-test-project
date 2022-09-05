import React from 'react';
import PropTypes from 'prop-types';
import './Container.scss';

const Container = (props) => {
    const { className, children } = props
    return (
        <div className={`container ${className}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
}

Container.defaultProps = {
    className: "",
    children: null
};

export default Container;