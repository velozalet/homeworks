import React from 'react';
import {Link} from 'react-router-dom';
import type {Car} from '../../types/car';

//Components:
import Button from '../../components/Button/Button'; 

/* (!) We moved this to separate file --> `src/types/car.ts`
interface Car {
  id: string;
  make:  'GMC'|'Chevrolet'|'Buick'|string;
  model: string;
  year: number;
  bodyStyle: 'Hatch'|'SUV'|'Sedan'|string;
  color: string;
  mileage: number;
  transmission: 'Auto'|'Manual'|string;
  fuelType: 'Gas'|'Diesel'|string;
  price: number; 
  images: string[]; //array of image URLs for multiple images
}
*/
const CarCard = ({ car }: {car:Car}) => {
  return (
    <div id={car.id} className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
        <div className="card card--car">
            <Link to={`/used-cars/${car.id}`} className="">
                <img src={car.images[0]} className="card-img-top img-fluid" alt={`${car.make} ${car.model}`} />
            </Link>
            <div className="card-body"> {/*bg-dark*/} 
                <h5 className="card-title">{car.make} {car.model}</h5> {/*text-white|text-black|text-warning*/}
                <h5 className="card-title card-title--price">
                    <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                        <i className="fa fa-dollar pe-1"></i>{car.price.toLocaleString()}
                        <Link to={`/used-cars/${car.id}`} className="btn btn-warning view-car--btn">View Car</Link>
                    </p>
                </h5>
                <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                <div className="card-text pt-2 row row-cols-3 g-2"> 
                    <div className="params _year">
                        <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                        > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">{car.year}</span>
                        </span> 
                    </div>
                    <div className="params _fuel"> 
                        <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                        ><i className="fa fa-tint"></i> <span className="txt ps-1">{car.fuelType}</span>
                        </span>
                    </div> 
                    <div className="params _transmission"> 
                        <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                        ><i className="fa fa-gears"></i> <span className="txt ps-1">{car.transmission}</span>
                        </span>
                    </div>
                    <div className="params _odo">
                        <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                        ><i className="">km</i>&nbsp;<span className="txt ps-1">{car.mileage}<span></span> </span>
                        </span>
                    </div>
                    <div className="params _color">
                        <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                        ><i className="fa fa-eye"></i> <span className="txt ps-1">{car.color}</span>
                        </span>
                    </div>
                    <div className="params _bodystyle">
                        <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                            data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                        ><i className="fa fa-car"></i> <span className="txt ps-1">{(car.bodyStyle === "suv") ? car.bodyStyle.toUpperCase() : car.bodyStyle}</span>
                        </span>
                    </div>
                </div>
            </div>
            {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
            <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
        </div>
  </div>
  );
};
export default CarCard;
