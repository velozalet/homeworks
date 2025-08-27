//Components:
import PageBanner from "../../components/PageBanner/PageBanner"; 
//import HtmlContent from "../../components/HtmlContent/HtmlContent";

//Styles:
import './AboutUs.css';

//Images:
import aboutus_page_bg from '../../assets/page-bg/page-bg-2.jpg';

function AboutUs(){

    return(
    <>
    <div className="aboutus--page">  

        <PageBanner url={aboutus_page_bg} title="About Us" />   

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 mb-xl-0 mb-lg-0 mb-sm-0 mb-4"> 
            <div className="row align-items-center">
                {/*1-block*/}
                <div className="col-6 p-0 c-block--text">
                    <div className="inner-content pe-4 text-black">
                        <h2 className="h2">New Vehicles For Sale in Calgary</h2>
                        <p>As an AMVIC-licensed business, CMP Auto features the latest and greatest in <a href="/inventory/new/">new
                        vehicles </a>from Chevrolet, Buick, and GMC, including popular models like the
                        Chevrolet Silverado, GMC Acadia, and Buick Encore. Browse through Calgary’s
                        widest selection of new GM vehicles today, or contact us to speak to a sales advisor
                        that will help you find the perfect ride for your lifestyle and budget.</p>
                    </div>
                </div>
                <div className="col-6 p-0 c-block--img">
                    <img className="img-fluid" src="https://static.foxdealer.com/486/2025/08/CMP-HomePage-07.jpg" alt="New GMC Vehicle" /> 
                </div>  
                {/*__/1-block*/}
                {/*2-block*/}
                <div className="col-6 p-0 c-block--img">
                    <img className="img-fluid" src="https://static.foxdealer.com/486/2025/08/CMP-HomePage-06.jpg" alt="Used GMC Vehicle" /> 
                </div> 
                <div className="col-6 p-0 c-block--text">
                    <div className="inner-content ps-4 text-black"> 
                        <h2 className="h2">Used Cars for Sale in Calgary</h2>
                        <p>We also offer a huge selection of <a href="/inventory/used/">pre-owned vehicles </a>in a variety of makes and
                        models at our Northeast Calgary dealership. Our certified technicians ensure that
                        all used vehicles in our inventory are high-quality and in perfect working order,
                        meaning that you’ll be able to find a reliable car, truck, or SUV without breaking
                        the bank. What’s more, we also buy your used vehicles for cash or trade-in value.
                        Check out our <a href="/inventory/pre-owned-specials/">pre-owned specials </a> to save even more on your next car purchase!</p>
                    </div>
                </div>
                {/*__/2-block*/}
                {/*3-block*/}
                <div className="col-6 p-0 c-block--text">
                    <div className="inner-content pe-4 text-black">
                        <h2 className="h2">Flexible Auto Financing in Calgary</h2>
                        <p>CMP Auto’s <a href="/finance-centre/">finance centre </a>in Calgary is here to help you secure an auto loan or
                        lease and find a solution that fits your budget. We work with a wide range of
                        lenders, allowing us to help secure terms and rates that are right for you, whether
                        you have good credit, bad credit, or no credit. Get <a href="/cmp-auto-financing/">pre-approved</a>, book a test drive,
                        and speak with our sales team to finance the car of your dreams.</p>
                    </div>
                </div>
                <div className="col-6 p-0 c-block--img">
                    <img className="img-fluid" src="https://static.foxdealer.com/486/2025/08/CMP-HomePage-04.jpg" alt="Flexible GMC Vehicle" />
                </div>  
                {/*__/3-block*/}
                {/*4-block*/}
                <div className="col-6 p-0 c-block--img">
                    <img className="img-fluid" src="https://static.foxdealer.com/486/2025/08/CMP-HomePage-05.jpg" alt="Certified GMC Vehicle" /> 
                </div> 
                <div className="col-6 p-0 c-block--text">
                    <div className="inner-content ps-4 text-black">
                        <h2 className="h2">GM-Certified Auto Service and Parts</h2>
                        <p>When your car, truck, or SUV requires maintenance or replacement parts, you can
                        trust CMP Auto’s <a href="/cmp-auto-is-here-for-your-routine-service-needs/">service department </a>to have what you need when you need it. Our
                        certified technicians can help with all your automotive needs, from oil changes to
                        tire rotations. In addition, we also offer affordable <a href="/parts-department/">OEM parts </a>for all GM models,
                        keeping your vehicle running safely and smoothly on Calgary’s roads.</p>
                    </div>
                </div>
                {/*__/4-block*/}
            </div>{/*.row*/} 
        </div>{/*.container*/} 

    </div> {/*.newcars--page*/} 
    </>
    ); 
}
export default AboutUs; 