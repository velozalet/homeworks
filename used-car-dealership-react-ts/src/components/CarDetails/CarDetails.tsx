//import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
//Components:
import { Link } from 'react-router-dom';
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
//import SliderCarouselMainContent from '../../components/SliderCarouselMainContent/SliderCarouselMainContent';

//Styles:
import './CarDetails.css';

const CarDetails = (): JSX.Element => {
    const {carId} = useParams<{ carId: string }>();
    //Get all cars from Redux
    const allCars = useSelector((state: RootState) => state.cars.allCars);
    //Find the car by ID
    const car = allCars.find(
        (item_car) => { return item_car.id === carId }
    );

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
    <div id={carId} className="car-details text-center">
        <div className="container-lg text-center">
            <nav className="breadcrumbs pt-lg-3 pt-md-3 pt-sm-2 pt-2" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to="/used-cars" className="breadcrumb-item">Used Cars</Link>  
                    <li className="breadcrumb-item active" aria-current="page">{car.make} {car.model}, {car.year}</li> 
                </ol>
            </nav>
            <h1 className="text-black">Car Details:</h1>
        </div>

        <div className="container-lg">
            <h1 className="text-black">{car.make} {car.model}</h1>
            <p className="text-black">Year: {car.year}</p>
            <p className="text-black">Body Style: {car.bodyStyle}</p>
            <p className="text-black">Fuel Type: {car.fuelType}</p>
            <p className="text-black">Mileage: {car.mileage} km</p>
            <p className="text-black">Transmission: {car.transmission}</p>
            <p className="text-black">Color: {car.color}</p>
            <p className="text-black">Price: ${car.price.toLocaleString()}</p>
        </div>


        {/*images
        <div className="car-images mt-4">
        {car.images && car.images.length > 0 ? (
            car.images.map((url: string, idx: number) => (
            <img key={idx} src={url} alt={`${car.make} ${car.model}`} className="car-image w-64 h-40 object-cover rounded shadow" />
            ))
        ) : (
            <p>No images available</p>
        )}
        </div>*/}

        <div className="container-lg">
            {/*Sinle Car's SliderCarousel*/}
            {car.images && car.images.length > 0 ? (
            <SliderCarousel id="sinle_car_slidercarousel" interval={90000} autoloop={true} effect_name="flash-fade">
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
            ) : (
            <p>No images available</p>
            )}
            {/*__/Sinle Car's SliderCarousel*/}


        <div className="car-images mt-4">
        {car.images && car.images.length > 0 ? (
            car.images.map( (url,index,array) => (
            <img key={index} src={url} alt={`${car.make} ${car.model}`} className="car-image w-64 h-40 object-cover rounded shadow" />
            ))
        ) : ( <p>No images available</p> )}
        </div>
        </div>
        

    </div>
    );
}
export default CarDetails;
