import React from 'react';
import "./Loader.css";

const Loader = () => {
    return (
        <>
    <div className="loader-container">
      <p className="text-center mb-0 me-3 text-size-equal">Please wait</p>
      <div className="bouncing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
        </>
    )
}

export default Loader
