import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toggleFavorite } from "../../store/favoritesSlice";
import {Link} from 'react-router-dom';
import type {Car} from '../../types/car';

//Components:
import Button from '../../components/Button/Button'; 
//Images:
import no_car_image_pattern from '../../assets/no-car-image-sm.png';

const CarCard = ({ car }: {car:Car}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const isFavorite = favorites.includes(car.id);

    useEffect(() => { //Init Bootstrap tooltips
        //@ts-ignore
        const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(el => new window.bootstrap.Tooltip(el));
        return () => {
            tooltipTriggerList.forEach((tooltip: any) => tooltip.dispose());
        };
    }, []); 

  return (
  <div id={car.id} className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
        <div className="card card--car">
            <Link to={`/used-cars/${car.id}`} className="">
                { ( !car.images[0] )
                    ? <img src={no_car_image_pattern} className="card-img-top img-fluid" alt={`${car.make} ${car.model}`} />
                    : <img src={car.images[0]} className="card-img-top img-fluid" alt={`${car.make} ${car.model}`} />
                }
            </Link>
            <div className="card-body"> {/*bg-dark*/}
                <h5 className="card-title">{( car.make === 'gmc' ) ? car.make.toUpperCase() : car.make } {car.model}
                    </h5> {/*text-white|text-black|text-warning*/}
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
            {/*<Button className="add-to-favorite fa fa-heart-o" text=""></Button>*/}
            <Button 
                className={`add-to-favorite fa ${isFavorite ? "fa-heart" : "fa-heart-o"}`}
                text=""
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Favorites"
                onClick={() => dispatch(toggleFavorite(car.id))}
            ></Button>
        </div>
  </div> 
  );
};
export default CarCard;
