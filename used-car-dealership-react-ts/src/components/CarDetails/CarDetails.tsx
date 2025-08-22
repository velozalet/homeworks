//import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
//Components:
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
            <div className="text-center">
                <h1 className="text-black">Car Details</h1>
                <p className="text-black">Car ID: {carId}</p>
            </div>
        </>
        );
    }

    return (
    <div className="car-details text-center">
        <div className="text-center">
            <h1 className="text-black">Car Details</h1>
            <p className="text-black">Car ID: {carId}</p>
        </div>

        <h1 className="text-black">{car.make} {car.model}</h1>
        <p className="text-black">Year: {car.year}</p>
        <p className="text-black">Body Style: {car.bodyStyle}</p>
        <p className="text-black">Fuel Type: {car.fuelType}</p>
        <p className="text-black">Mileage: {car.mileage} km</p>
        <p className="text-black">Transmission: {car.transmission}</p>
        <p className="text-black">Color: {car.color}</p>
        <p className="text-black">Price: ${car.price.toLocaleString()}</p>

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

        <div className="container">
            {/*Sinle Car's SliderCarousel*/}
            {car.images && car.images.length > 0 ? (
            <SliderCarousel id="sinle_car_slidercarousel" interval={40000} autoloop={true} effect_name="flash-fade">
                <div className="carousel-inner">
                {car.images.map((url, idx) => (
                    <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
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
        </div>
        

    </div>
    );
}
export default CarDetails;
