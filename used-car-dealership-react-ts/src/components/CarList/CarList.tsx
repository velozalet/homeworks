/*This will pull filteredCars from Redux and map them to CarCards*/

import React, {useEffect,useState} from "react";
import { useSelector } from 'react-redux';
//import { Car } from "../../types/Car";
import type { RootState } from '../../store/store';
import CarCard from './CarCard'; 


const CarList = () => {
    const cars = useSelector((state: RootState) => state.cars.filteredCars); 
  
    if( !cars.length ){ return <p className="no-cars-found">No cars found.</p>; }
  
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