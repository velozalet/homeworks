/*This will pull filteredCars from Redux and map them to CarCards*/

import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import CarCard from './CarCard'; 

const CarList = () => {
    const cars = useSelector((state: RootState) => state.cars.filteredCars); 
  
    if( !cars.length ){ return <p>No cars found.</p>; }
  
    return (
    <div className="row cars-grid justify-content-center">
        {cars.map(item => (
            <div className="col-md-4 mb-3" key={item.id}> 
                <CarCard car={item} />
            </div>
        ))}
    </div>
    );
};
export default CarList;