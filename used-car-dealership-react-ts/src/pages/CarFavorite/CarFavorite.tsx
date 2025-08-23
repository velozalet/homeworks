import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { clearFavorites } from "../../store/favoritesSlice";
import type { Car } from "../../types/car";
//components:
import CarCard from "../../components/CarList/CarCard";
import Button from '../../components/Button/Button';
import { Link,useNavigate  } from 'react-router-dom';

//Styles:
import './CarFavorite.css';

const CarFavorite = () => {
    const allCars = useSelector((state: RootState) => state.cars.allCars);
    const [favorites, setFavorites] = useState<string[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) setFavorites(JSON.parse(stored));
    }, []);
    //Filter cars that are in favorites
    const favoriteCars: Car[] = allCars.filter(
        (car) => { return favorites.includes(car.id); }
    );
    //Remove Ids of clicked Cars(`Clear Favorites btn`) from LocalStorage
    const handleClearAll = ()=> {
        dispatch(clearFavorites());
        navigate("/used-cars"); //auto-redirect after clearing
    };

    if (!favoriteCars.length) { return <p className="text-center mt-4">No favorite cars selected yet.</p>; }
    
    return (
    <div className="usedcar--page usedcar--page--favorite pt-lg-4 pt-md-4 pt-sm-4 pt-3">
        <div className="container-lg py-lg-4 py-md-4 py-sm-2">
        <nav className="breadcrumbs" aria-label="breadcrumb"> 
                <ol className="breadcrumb">
                    <Link to="/used-cars" className="breadcrumb-item">Used Cars</Link> 
                    <li className="breadcrumb-item active" aria-current="page">favorit car list</li> 
                </ol>
            </nav>
            <div className="usedcar--page-titles usedcar--page-favorite-titles"> 
                <h1 className="text-center">Your <strong>Favorite</strong> Car List</h1>
                <p className="text-center"><strong>{favoriteCars.length}</strong>Cars Added</p> 
            </div>
            <hr /> 
            <Button as="button" className="clear-favorites mt-2" onClick={handleClearAll} text="Clear Favorites"></Button>   
        </div>

        <div className="parallax-content container-lg py-lg-4 py-md-4 py-sm-2 py-2">
            <div className="row justify-content-center">
                <aside className="cars favorite col-lg-10"> 
                    <section className="cars-section">
                        <div className="row cars-grid justify-content-center">
                        {favoriteCars.map( car => ( <CarCard key={car.id} car={car} /> ))} 
                        </div>
                    </section> {/*.cars-section*/}
                </aside>
            </div> {/*.row*/}
        </div> {/*.container*/}
    </div>
    );
};
export default CarFavorite;
