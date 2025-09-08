import React, { useState } from "react";

//Components:
import PageBanner from "../../components/PageBanner/PageBanner"; 
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
import SliderCarouselTestimonialsContent from '../../components/SliderCarouselTestimonialsContent/SliderCarouselTestimonialsContent';
import SliderCarouselNewCarsContent from '../../components/SliderCarouselNewCarsContent/SliderCarouselNewCarsContent';

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

                <div className="mt-5 mb-4" style={{width:'1200px',display:'grid' }}>
                    <div className="gallery-full"> 
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FGMC-Sierra1500-red.jpg?alt=media&token=2b1113e5-bc1e-4ba5-93ad-28cb74382acc" alt="a forest after an apocalypse" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2F8BDSTGqM8X7iXszyH6vs%2FBuick-Encore-GX-yellow.jpg?alt=media&token=3d78c16e-c8e6-4102-a3d8-81946e002daf" alt="a waterfall and many rocks" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FBuick-Encore-GX-white.jpg?alt=media&token=12781620-4f70-47e7-9f8f-6bf79a69da69" alt="a house on a mountain" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FBuick-Encore-GX-blue.jpg?alt=media&token=dd6b53ce-4576-461a-b0aa-d1164c7367c7" alt="sime pink flowers" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2Fgmc-terrain-red.png?alt=media&token=c7f88103-2545-425d-9878-38c96ff16072" alt="big rocks with some trees" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FchevroletEquinox-black.jpg?alt=media&token=befa2d32-a4db-4c79-937f-72cf2046b4e9" alt="a waterfall, a lot of tree and a great view from the sky" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FGMC-Sierra1500-blue.jpg?alt=media&token=860b6c63-7b21-4780-80b4-a2faaedc8637" alt="a cool landscape" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FchevroletEquinox-red.png?alt=media&token=ff951b0f-a62c-4c6b-8310-76876a242eb1" alt="a cool landscape" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/used-car-dealership-react-ts.firebasestorage.app/o/cars%2Ftemp%2FGMC-Sierra1500-red.jpg?alt=media&token=2b1113e5-bc1e-4ba5-93ad-28cb74382acc" alt="a forest after an apocalypse" />
                    </div>
                </div>
                <br />

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