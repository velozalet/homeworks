import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { Car } from "../../types/car";
import CarCard from './CarCard'; 

//Images:
import no_cars_found from '../../assets/no_cars_found.png';

type CarListProps = {
    cars?: Car[];
};

const CarList = ( {cars}: CarListProps ) => {
    const reduxCars = useSelector((state: RootState) => state.cars.filteredCars); 
    const loading = useSelector((state: RootState) => state.cars.loading);

    const list = cars ?? reduxCars;

    if( loading ){ 
        return (
            <div className="text-center my-5">
            <i className="fa fa-spinner fa-spin" style={{fontSize:"48px",color:"red"}}></i>
            </div>
        );
    }
    if( !list.length ){ 
        return <div className="no-cars-found text-center"><img className="no-cars-found-img" src={no_cars_found} alt="no_cars_found" /> </div>
    }
  
    return( 
    <div className="row cars-grid justify-content-center">
        {list.map(item => (
            <CarCard key={item.id} car={item} />
        ))}
    </div> //.row
    );
};
export default CarList;