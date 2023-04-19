import React from 'react';

const PageNotFound = () => {
    return (
        <div class="container" style={{
            margin: "50px auto",
            textAlign: "center"
        }}>
            <h1 style={{
                fontSize: "6em",
                margin: "0",
                color: "#777",
            }}>
                404</h1>

            <p style={{
                fontSize: "1.2em",
                marginTop: "20px"
            }}>
                Oops! The page you requested could not be found.</p>

            <p style={{
                fontSize: "1.2em",
                marginTop: "20px"
            }}>
                Go back to the <a href="/" style={{
                    color: "#333",
                    textDecoration: "none",
                    borderBottom: "1px solid #333",
                    paddingBottom: "2px"
                }}
                >homepage</a>.</p>
        </div >
    )
}

export default PageNotFound;
