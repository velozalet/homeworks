import React from "react";

//Styles:
import './PageBanner.css';

    type PageBannerProps = {
        url: string;
        title: string;
    };

const PageBanner: React.FC<PageBannerProps> = ({ url, title }) => {
    return (
    <div className="page-banner" style={{ backgroundImage:`url(${url})`, backgroundSize:"cover" }}>
        <div className="container-lg">
            <div className="row align-items-center loading-container">
                <div className="text-center loading-text">
                    <span><h1>{title}</h1> </span>
                </div> 
            </div>
        </div>
    </div>
    );
};
export default PageBanner; 
