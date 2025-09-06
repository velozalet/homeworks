import React, { useState } from "react";

//Components:
import PageBanner from "../../components/PageBanner/PageBanner"; 
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
import SliderCarouselTestimonialsContent from '../../components/SliderCarouselTestimonialsContent/SliderCarouselTestimonialsContent';
import SliderCarouselNewCarsContent from '../../components/SliderCarouselNewCarsContent/SliderCarouselNewCarsContent';
//import HtmlContent from "../../components/HtmlContent/HtmlContent";

//Styles:
import './NewCars.css';

import { gmcNewCars } from "../../constants/gmcNewCars"; //Array of GMC new cars
import { chevroletNewCars } from "../../constants/chevroletNewCars"; //Array of Chevrolet new cars
import { buickNewCars } from "../../constants/buickNewCars"; //Array of Buick new cars


//Images:
import newcars_page_bg from '../../assets/page-bg/page-bg-1.jpg';
import gmc_logo_mini from '../../assets/gmc-logo-mini.png';
import chevrolet_logo_mini from '../../assets/chevrolet-logo-mini.png';
import buick_logo_mini from '../../assets/buick-logo-mini.png';
import GMClogo from '../../assets/car_make/GMC__logo.png';

function NewCars(){
    const [activeTab, setActiveTab] = useState<"gmc" | "chevrolet" | "buick">("gmc");
    
    return( 
    <>
    <div className="newcars--page">  

        <PageBanner url={newcars_page_bg} title="New Cars" />   

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 mb-xl-0 mb-lg-0 mb-sm-0 mt-4 mb-4"> 
            <div className="row">

                <div className="new-cars-tabs text-center">
                    <button 
                    className="btn btn-primary gmc_logo_mini"
                    onClick={ () => setActiveTab("gmc") }
                    ><img src={gmc_logo_mini} alt="" /></button>
                    <button 
                    className="btn btn-primary buick_logo_mini mx-3"
                    onClick={ () => setActiveTab("buick")}
                    ><img src={buick_logo_mini} alt="" /></button>
                    <button className="btn btn-primary chevrolet_logo_mini"
                    onClick={ () => setActiveTab("chevrolet") }
                    ><img src={chevrolet_logo_mini} alt="" /></button> 
                </div>

 
                { (activeTab) === "gmc" &&
                <section className="gmc-newcars--section pb-0 pt-lg-5 pt-md-5 pt-sm-5 pt-4">
                    <div className="container-lg">
                        <h2 className="text-center text-warning mb-4">GMC</h2>
                        <div className="row g-4 newcars--page--newcars-slider">
                            <SliderCarousel id={"slider_gmc_new_cars"} interval={90000}  autoloop={true} effect_name="simply-carousel">
                                <SliderCarouselNewCarsContent cars={gmcNewCars} /> 
                            </SliderCarousel> 
                        </div> {/*.row*/} 
                    </div> {/*.container*/}
                </section>
                }
                { (activeTab) === "chevrolet" &&
                <section className="chevrolet-newcars--section pb-0 pt-lg-5 pt-md-5 pt-sm-5 pt-4">
                    <div className="container-lg">
                        <h2 className="text-center text-warning mb-4">Chevrolet</h2>
                        <div className="row g-4 newcars--page--newcars-slider">
                            <SliderCarousel id={"slider_buick_new_cars"} interval={90000}  autoloop={true} effect_name="simply-carousel">
                                <SliderCarouselNewCarsContent cars={chevroletNewCars} /> 
                            </SliderCarousel>
                        </div> {/*.row*/}
                    </div> {/*.container*/} 
                </section>
                }
                { (activeTab) === "buick" &&
                <section className="buick-newcars--section pb-0 pt-lg-5 pt-md-5 pt-sm-5 pt-4">
                    <div className="container-lg">
                        <h2 className="text-center text-warning mb-4">Buick</h2>
                        <div className="row g-4 newcars--page--newcars-slider">
                            <SliderCarousel id={"slider_chevrolet_new_cars"} interval={90000}  autoloop={true} effect_name="simply-carousel">
                                <SliderCarouselNewCarsContent cars={buickNewCars} /> 
                            </SliderCarousel>
                        </div> {/*.row*/}
                    </div> {/*.container*/} 
                </section>
                }

                {/* Testimonials Section - Slider*/} 
                <section className="mt-5 testimonials--section">
                    <div className="container-lg">
                        <h2 className="text-center text-warning mb-0">What Our Clients Say</h2>
                        <div className="row g-4 newcars--page--testemonials-slider">
                            <SliderCarousel id={"slider_testimonials"} interval={60000}  autoloop={true} effect_name="simply-carousel">
                                <SliderCarouselTestimonialsContent />
                            </SliderCarousel> 
                        </div> {/*.row*/} 
                    </div> {/*.container*/} 
                </section>
                {/*__/Testimonials Section - Slider*/}

            </div>{/*.row*/} 
        </div>{/*.container*/} 
    </div> {/*.newcars--page*/} 
    </>
    ); 
}
export default NewCars; 