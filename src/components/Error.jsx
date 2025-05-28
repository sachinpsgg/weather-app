import React from 'react';

const Error = ({message}) => {
    return (
        <>
            <p className="text-red-500 mt-4">{message}</p>
        </>
    );
}

export default Error;