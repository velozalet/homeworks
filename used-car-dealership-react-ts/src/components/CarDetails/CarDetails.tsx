//import React from 'react';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
//Components:
import { Link } from 'react-router-dom';
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
import ContactForm from "../../components/ContactForm/ContactForm"; 
import Tabs from "../../components/Tabs/Tabs";
import HtmlContent from "../../components/HtmlContent/HtmlContent";

// Fancybox
import { type FancyboxOptions, Fancybox } from "@fancyapps/ui/dist/fancybox/";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
//Styles:
import './CarDetails.css';

//Images:
import fa_coins_icon from '../../assets/icons/fa-coins_icon.png';
import car_fax_bage from '../../assets/icons/car_fax_bage.svg';
import one_owner_bage from '../../assets/icons/one-owner@1x.svg';
import accident_free_bage from '../../assets/icons/accident-free@1x.svg';


const CarDetails = (): JSX.Element => {
    const {carId} = useParams<{ carId: string }>();
    //Get all cars from Redux
    const allCars = useSelector((state: RootState) => state.cars.allCars);
    //Find the car by ID
    const car = allCars.find(
        (item_car) => { return item_car.id === carId }
    ); //console.log(car);

    //Bind Fancybox on mount
    useEffect(() => {
        Fancybox.bind("[data-fancybox='gallery']", {
        Thumbs: true,
        Toolbar: {
            display: ["close"],
        },
        animated: true, // enable animations
        showClass: "fancybox-fadeIn",
        hideClass: "fancybox-fadeOut",
        Carousel: {
          transition: "slide", //'fade'|'slide'|'circular'|'classic'
        },
    } as any);
    return () => { Fancybox.destroy(); };
    }, []);

    if( !car ){
        return( 
        <>
            <div className="container-lg text-center"> 
                <nav className="breadcrumbs pt-lg-3 pt-md-3 pt-sm-2 pt-2" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <Link to="/used-cars" className="breadcrumb-item">Used Cars</Link> 
                        <li className="breadcrumb-item active" aria-current="page">Car - {carId}</li>  
                    </ol>
                </nav>
                <h1 className="text-black">Car Details</h1>
                <p className="text-black">Car ID: {carId}</p> 
            </div>
        </>
        );
    }

    return (
    <div id={carId} className="cardetails--page">
        <div className="container-lg text-center">
            <nav className="breadcrumbs pt-lg-3 pt-md-3 pt-sm-2 pt-2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/used-cars" className="breadcrumb-item">Used Cars</Link>  
                    <li className="breadcrumb-item active" aria-current="page">{car.make} {car.model}, {car.year}</li> 
                </ol>
            </nav>
        </div>{/*.container*/}
        <div className="container-lg py-lg-4 py-md-4 py-sm-2">
            <div className="cardetails--page-titles">
                <h1 className="text-center mb-3">Car Details:</h1> 
                {/* <p className="text-center">All our cars have a <strong>CarFax</strong> report</p> */}
                <p className="text-center">All our cars have a 
                <img className="ps-3" src="https://cdn.carfax.ca/vehicle-history/images/1.0.0/carfax-canada.svg" alt="Carfax Canada" /> 
                </p>
            </div>
            <hr />

            <h2 className="text-center mb-sm-0 mb-4 ">{car.make} {car.model}, {car.year}</h2>
        </div>{/*.container*/}

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 mb-xl-0 mb-lg-0 mb-sm-0 mb-4">
            <div className="row">
                <aside className="cardetails--slider col-lg-9 order-lg-1 order-md-2 order-sm-2 order-2">
                    <div className="slider--images">
                        {/*Sinle Car's SliderCarousel*/}
                        {car.images && car.images.length > 0 ? (
                        <SliderCarousel id="single_car_slidercarousel" interval={900000} autoloop={true} effect_name="simply-carousel">
                            <div className="carousel-inner">
                            {car.images.map( (url,index,array) => ( 
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                    <img src={url} alt={`${car.make} ${car.model}`} className="d-block w-100" />
                                </div>
                            ))}
                            </div>
                            {/*Carousel indicators
                            <div className="carousel-indicators">
                            {car.images.map((_, idx) => (
                                <button
                                key={idx}
                                type="button"
                                data-bs-target="#slider_carousel"
                                data-bs-slide-to={idx}
                                className={idx === 0 ? "active" : ""}
                                aria-current={idx === 0 ? "true" : undefined}
                                aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                            </div>*/}
                        </SliderCarousel>
                        ) : ( <p>No images available</p> )}
                        {/*__/Sinle Car's SliderCarousel*/}

                        <div className="car-images-block mt-4 mb-3">
                            <div className="row row-cols-5 justify-content-center"> 
                                {car.images && car.images.length > 0 ? (
                                car.images.map((url, index) => (
                                <div className="col" key={url}>
                                    {/*Wrap <img> in <a> for Fancybox*/}
                                    <a href={url} data-fancybox="gallery">
                                        <img src={url} alt={`${car.make} ${car.model}`} className="car-image img-fluid" />
                                    </a>
                                </div>
                                ))
                                ) : ( <p>No images available</p> )}
                            </div> {/*.row*/} 
                        </div>
                    </div>
                </aside>

                <aside className="cardetails--description col-lg-3 order-lg-2 order-md-1 order-sm-1 order-1"> 
                    <div className="container-lg text-lg-start text-md-start text-sm-start text-start ps-3">  
                        <h3 className="d-lg-block d-md-none d-sm-none d-none mb-4">{car.make} {car.model}</h3>
                        <p className="rack d-sm-none d-block">
                            <i className="fa fa-barcode chromatic-aberration-effect pe-2"></i><span>{car.vin}</span>
                        </p> 
                        <div className="grid-container"> 
                            <p className="rack"><i className="fa fa-calendar-check-o chromatic-aberration-effect pe-2"></i><span>{car.year}</span></p>
                            <p className="rack"><i className="fa fa-tint chromatic-aberration-effect pe-3"></i><span>{car.fuelType}</span></p>
                            <p className="rack"><i className="fa fa-cogs chromatic-aberration-effect pe-2"></i><span>{car.transmission}</span></p> 
                            <p className="rack"><i className="fa fa-road chromatic-aberration-effect pe-2"></i><span>{car.mileage} km</span></p> 
                            <p className="rack"><i className="fa fa-eye chromatic-aberration-effect pe-2"></i><span>{car.color}</span></p>
                            <p className="rack"><i className="fa fa-car chromatic-aberration-effect pe-2"></i><span>{car.bodyStyle}</span></p>  
                            <p className="rack d-sm-block d-none"><i className="fa fa-barcode chromatic-aberration-effect pe-2"></i><span>{car.vin}</span></p>
                            <p className="rack rack-price"><img src={fa_coins_icon} alt="fa_coins_icon" /><span className="text-primary fs-special">{car.price.toLocaleString()}</span></p> 
                        </div> 
                        <div className="row justify-content-center">
                            {/* <p className="rack"><i className="fa fa-file-text-o pe-2"></i><span>CarFax Clear</span></p> 
                            <p className="rack"><i className="fa fa-check-circle pe-2"></i><span>No Accident</span></p> 
                            <p className="rack"><i className="fa fa-user pe-2"></i><span>1 Owner</span></p> */}

                            { (car.oneOwner) ? 
                                <div className="bage col-xl-12 col-lg-12 col-md-2 col-sm-3 col-7 mb-2 text-sm-start text-center">
                                    <img className="img-fluid" src={one_owner_bage} alt="one_owner_bage" /> 
                                </div> : null
                            }
                            { (car.noAccident) ? 
                                <div className="bage col-xl-12 col-lg-12 col-md-2 col-sm-3 col-7 mb-2 text-sm-start text-center">
                                    <img className="img-fluid" src={accident_free_bage} alt="accident_free_bage" /> 
                                </div> : null
                            }
                            { (car.carfaxClear) ? 
                                <div className="bage col-xl-12 col-lg-12 col-md-2 col-sm-3 col-7 mb-2 text-sm-start text-center"> 
                                <img className="img-fluid" src={car_fax_bage} alt="car_fax_bage" />   
                                </div> : null
                            }
                         </div>{/*.row*/}
                    </div>
                </aside> 

                <aside className="contact-form cardetails--tabs-description col-lg-12 order-lg-3 order-md-3 order-sm-3 order-3 mt-5">
                    <Tabs
                        tabs={[
                        {
                            label: "Description", 
                            content: (
                            <section className="tab-item--content car--description">
                                <h5 className="car-description-header-h">{car.make} {car.model}, {car.year}</h5>  
                                <HtmlContent htmlString={car.description} />
                            </section>
                            ),
                        },
                        {
                            label: "Options",
                            content: (
                            <section className="tab-item--content car--option">
                                <ul className="list-group">
                                    {(car && car.options)
                                    ? car.options.map( (option,index,array) => ( 
                                        <li key={index} className="list-group-item">  
                                            <i className="fa fa-check-square-o pe-2"></i>{option}
                                        </li>
                                        ))
                                    : "no content..." }
                                </ul>
                            </section>
                            ),
                        },
                        {
                            label: "Safety",
                            content: (
                            <section className="tab-item--content car--safety"> 
                                <ul className="list-group">
                                    {(car && car.safety)
                                    ? car.safety.map( (saf,index,array) => ( 
                                        <li key={index} className="list-group-item">  
                                            <i className="fa fa-check-square-o pe-2"></i>{saf} 
                                        </li>
                                        ))
                                    : "no content..." }
                                </ul>
                            </section>
                            ),
                        },
                        ]}
                    />
                </aside>

                <aside className="contact-form contact-form--carbooking col-lg-12 order-lg-4 order-md-4 order-sm-4 order-4 mt-5">
                    <h3 className="text-center mb-xl-5 mb-lg-5 mb-md-4 mb-sm-4 mb-4">Book this car</h3> 
                    <div className="wrapper wrapper-placeholder">
                        <ContactForm 
                            mode="booking" 
                            carId={car.id} 
                            make={car.make} 
                            model={car.model} 
                            year={car.year} 
                            mileage={car.mileage} 
                            price={car.price}
                        />
                    </div>
                </aside>
            </div>{/*.row*/} 
        </div>{/*.container*/} 

    </div> //.cardetails--page 
    );
}
export default CarDetails;
