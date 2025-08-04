import React from 'react'
import './Spinner.css'

const Spinner = ({size}) => {
    const spinnerclass = size === 'small' ? 'spinner spinner-small' : 'spinner';
    return <div className={spinnerclass}></div>;

}

export default Spinner
