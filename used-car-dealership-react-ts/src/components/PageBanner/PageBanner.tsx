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
            <div className="row align-items-center">
                <div className="text-center">
                    <h1>{title}</h1> 
                </div> 
            </div>
        </div>
    </div>
    );
};
export default PageBanner; 
/*Usage:
  <PageBanner 
    url="/images/banner-cars.jpg" 
    title="Used Cars for Sale" 
  />
*/
