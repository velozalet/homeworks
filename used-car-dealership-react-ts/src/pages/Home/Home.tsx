//Components:
import { Link } from 'react-router-dom';
//import Button from '../../components/Button/Button';
//import ModalWindow from '../../components/ModalWindow/ModalWindow';
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
import SliderCarouselMainContent from '../../components/SliderCarouselMainContent/SliderCarouselMainContent';
import SliderCarouselTestimonialsContent from '../../components/SliderCarouselTestimonialsContent/SliderCarouselTestimonialsContent';

//Images:
import mainHomeBanner from '../../assets/main-home-banner.png';
import Buicklogo from '../../assets/car_make/Buick__logo.png';
import Chevylogo from '../../assets/car_make/Chevy__logo.png';
import GMClogo from '../../assets/car_make/GMC__logo.png';

//Styles:
import './Home.css';


function Home(){ 
    return(
    <>
    <div className="home--page">

        {/*Header --> Header Component*/}
 
        {/*Hero Section*/}
        <section className="hero d-md-block d-flex align-items-center" style={{backgroundImage:`url(${mainHomeBanner})`}}>  
            <div className="container">
                <div className="a"> 
                    <h1 className="chromatic-aberration-effect">USED CAR DEALERSHIP <span>SERVICE</span></h1>
                    <p className="lead">Only Recent Year Cars!</p>
                    {/* <Button as="a" className="btn-yellow mt-3 px-4 py-2" href="/used-cars" text="View Details"></Button> */}
                    <Link to="/used-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>
                </div>
            </div> {/*.container*/}
        </section>
        {/*__/Hero Section*/}

        <hr style={{color:'black',margin:'7px',opacity:.35}} />  
        {/*Main SliderCarousel*/}
        <SliderCarousel id={"slider_carousel"} interval={4000} autoloop={true} effect_name="flash-fade">
            <SliderCarouselMainContent />
        </SliderCarousel>
        {/*__/Main SliderCarousel*/}

        {/*Inventory Section*/}
        <section className="inventory pt-lg-4 pt-md-3 pt-sm-0 pt-0 pb-lg-5 pb-md-5 pb-sm-3 pb-3" id="inventory">
            <div className="container-lg">
                <h2 className="text-center mb-lg-3 mb-md-1 mb-sm-0 mb-0">Our Inventory</h2>
                <div className="row g-4 justify-content-center align-items-stretch">

                    <div className="flipp col-lg-4 col-md-4 col-sm-6 col px-lg-3 px-md-2 px-sm-4 px-4 order-lg-1 order-md-1 order-sm-1 order-1">
                        <div className="card inventory-card h-100">
                            {/*Front of Card*/}
                            <div className="card-front">
                                <img src={GMClogo} className="card-img-top img-fluid" alt="GMC logo"/>
                                <div className="card-body">
                                    <h5 className="card-title text-white chromatic-aberration-effect">GMC</h5>
                                    {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="/new-cars" text="View Details"></Button> */}
                                    <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>
                                </div>
                            </div>
                            {/*Back of Card*/}
                            <div className="card-back">
                                <h4>GMC</h4>
                                <p><strong>GMC</strong> trucks combine power and reliability to tackle tough jobs. GMC trucks combine power and reliability to tackle tough jobs</p>
                                {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="/new-cars" text="View Details"></Button> */}
                                <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>

                            </div>
                        </div>
                    </div>

                    <div className="flipp col-lg-4 col-md-4 col-sm-6 col px-lg-3 px-md-2 px-sm-4 px-4 order-lg-2 order-md-2 order-sm-3 order-3">
                        <div className="card inventory-card h-100">
                            {/*Front of Card*/}
                            <div className="card-front">
                                <img src={Chevylogo} className="card-img-top img-fluid" alt="Chevrolet Logo"/>
                                <div className="card-body">
                                    <h5 className="card-title text-white chromatic-aberration-effect">Chevrolet</h5>
                                    {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="/new-cars" text="View Details"></Button> */}
                                    <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link> 
                                </div>
                            </div>
                            {/*Back of Card*/}
                            <div className="card-back">
                                <h4>Chevrolet</h4>
                                <p><strong>Chevrolet</strong> offers a range of cars and SUVs that balance style with performance. Chevrolet offers a range of cars and SUVs that balance style.</p>
                                {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="/new-cars" text="View Details"></Button> */}
                                <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flipp col-lg-4 col-md-4 col-sm-6 col px-lg-3 px-md-2 px-sm-4 px-4 order-lg-3 order-md-3 order-sm-2 order-2">
                        <div className="card inventory-card h-100">
                            {/*Front of Card*/}
                            <div className="card-front">
                                <img src={Buicklogo} className="card-img-top img-fluid" alt="Buick Logo"/>
                                <div className="card-body">
                                    <h5 className="card-title text-white chromatic-aberration-effect">Buick</h5>
                                    {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="" text="Learn More"></Button> */}
                                    <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>
                                </div>
                            </div>
                            {/*Back of Card*/}
                            <div className="card-back"> 
                                <h4>Buick</h4>
                                <p><strong>Buick</strong> delivers a comfortable driving experience with advanced technology. Buick delivers a comfortable driving experience with advanced tech</p>
                                {/* <Button as="a" className="btn btn-yellow mt-3 px-4 py-2" href="/new-cars" text="View Details"></Button> */}
                                <Link to="/new-cars" className="btn btn-yellow mt-3 px-4 py-2">View Details</Link>
                            </div>
                        </div>
                    </div>
                     
                </div> {/*.row*/} 
            </div> {/*.container*/} 
        </section>
        {/*__/Inventory Section*/}

        {/* Testimonials Section - Slider*/} 
        <section className="pb-0 pt-lg-5 pt-md-5 pt-sm-5 pt-4 bg-dark">
            <div className="container-lg">
                <h2 className="text-center text-warning mb-0">What Our Clients Say</h2>
                <div className="row g-4">
                    <SliderCarousel id={"slider_testimonials"} interval={6000}  autoloop={true} effect_name="simply-carousel">
                        <SliderCarouselTestimonialsContent />
                    </SliderCarousel> 
                </div> {/*.row*/} 
            </div> {/*.container*/} 
        </section>
        {/*__/Testimonials Section - Slider*/}

       {/*Footer --> Footer Component*/} 
    </div>
    </>
    ); 
}
export default Home; 