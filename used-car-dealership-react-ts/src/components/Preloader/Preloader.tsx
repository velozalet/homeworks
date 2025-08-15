import React from 'react';

//Styles:
import './Preloader.css';

function Preloader() {

    return(
    // <div className="preloader d-flex align-items-center justify-content-center">
    //     <div className="spinner-border text-primary" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //     </div>
    // </div>
    <div id="loading">
        <div id="loading-center">
            <div id="loading-center-absolute">
                <div className="object" id="first_object"></div>
                <div className="object" id="second_object"></div>
                <div className="object" id="third_object"></div>
            </div>
        </div>
    </div>
    );
}
export default Preloader;
