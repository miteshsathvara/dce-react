// Loader.js
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ visible }) => (

    visible && (
        <div className="loader-wrapper">
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
);

export default Loader;
