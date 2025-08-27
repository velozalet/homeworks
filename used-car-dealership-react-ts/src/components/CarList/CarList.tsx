/*This will pull filteredCars from Redux and map them to CarCards*/
//import React, {useEffect,useState} from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import CarCard from './CarCard'; 

//Images:
import no_cars_found from '../../assets/no_cars_found.png';

const CarList = () => {
    const cars = useSelector((state: RootState) => state.cars.filteredCars); 
    const loading = useSelector((state: RootState) => state.cars.loading);

    if( loading ){
        return (
            <div className="text-center my-5">
            <i className="fa fa-spinner fa-spin" style={{fontSize:"48px",color:"red"}}></i>
            </div>
        );
    }
    if( !cars.length ){ 
        //return <p className="no-cars-found text-center mt-lg-5 mt-md-5 mt-sm-4 mt-3">No cars found...</p>;  
        return <div className="no-cars-found text-center"><img className="no-cars-found-img" src={no_cars_found} alt="no_cars_found" /> </div>
    }
  
    return( 
    <div className="row cars-grid justify-content-center">
        {cars.map(item => (
            <CarCard key={item.id} car={item} />
        ))}
    </div> //.row
    );
};
export default CarList;
/* If you prefer to pass cars manually (good for reusability, like showing “featured cars” in another place), then change CarList.tsx to accept a prop:
    type Props = {
    cars: Car[];
    };

    const CarList = ({ cars }: Props) => {
    if (!cars.length) {
        return <p className="no-cars-found">No cars found.</p>;
    }

    return (
        <div className="row cars-grid justify-content-center">
        {cars.map((item) => (
            <CarCard key={item.id} car={item} />
        ))}
        </div>
    );
    };
*/