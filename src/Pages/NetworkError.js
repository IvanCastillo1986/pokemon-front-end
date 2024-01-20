import React from 'react'



export default function NetworkError() {

    const networkErrorStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px"
    }

    return (
        <div className='NetworkError' style={networkErrorStyles}>
            <h2>We are experiencing network issues.</h2>
            <p>Please try again later.</p>
        </div>
    )
}
