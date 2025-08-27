import { Link } from 'react-router-dom';
import React, { useState,useEffect,useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import type {  RootState, AppDispatch } from "../../store/store"; 
import { setCars,resetFilters,setLoading,setSortOrder } from "../../store/carsSlice";
import { fetchCars } from "../../services/carService";

//Components:
import Button from '../../components/Button/Button';
//import FilterSidebar from "../../components/Filters/FilterSidebar";
import FilterMake from "../../components/Filters/FilterMake";
import FilterModel from "../../components/Filters/FilterModel";
import FilterYear from "../../components/Filters/FilterYear";
import CarList from "../../components/CarList/CarList";
import FilterBodyStyle from "../../components/Filters/FilterBodyStyle";
import FilterFuelType from "../../components/Filters/FilterFuelType";
import FilterMileage from "../../components/Filters/FilterMileage";
import FilterPrice from "../../components/Filters/FilterPrice"; 

//Styles:
import './UsedCars.css';

function UsedCars(){
    const [sortOrder, setLocalSortOrder] = useState<"none" | "asc" | "desc">("none"); //`none`→ initial neutral state | `asc`→ Low → High | `desc` → High → Low
    //const [colorScheme, setColorScheme] = useState<"light" | "dark">("light"); //check the `Color Scheme` state current: `light`|`dark`
      
    const [colorScheme, setColorScheme] = useState<"light" | "dark">(() => { //Read initial colorScheme from localStorage
        return (localStorage.getItem("colorScheme") as "light" | "dark") || "light";
    });

    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const allCars = useSelector((state: RootState) => state.cars.allCars); //Get all Cars array from `Redux Store`
    const filteredCars = useSelector((state: RootState) => state.cars.filteredCars); //Get filtered Cars from `Redux Store`
    const favorites = useSelector((state: RootState) => state.favorites.favorites); //Get `favorites` array from `Redux Store`
    const {selectedMake,selectedModel,selectedYear,selectedBodyStyle,selectedFuelType,selectedMileage,selectedPrice} = useSelector((state: RootState) => state.cars); //Get each filter from `Redux Store`
   
    const pageColorSchemeRef = useRef<HTMLDivElement>(null); //`Ref`to <div className="usedcar--page"> --> color-scheme--dark|color-scheme--ligh

    useEffect(() => { //1) Load cars from Firebase DB
        async function loadCars() {
          try {
            dispatch(setLoading(true)); //start loading...
            const cars = await fetchCars();
            dispatch(setCars(cars));
          }catch(error){
            console.error("Error loading cars:", error);
          }finally{
            dispatch(setLoading(false)); //stop loading...
          }
        }
        loadCars();
    }, [dispatch]);

    useEffect(() => { //2) Init Bootstrap tooltips
        if (!filteredCars.length) return; // no elements yet
        //@ts-ignore
        const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(el => new window.bootstrap.Tooltip(el));
        return () => {
            tooltipTriggerList.forEach((tooltip: any) => tooltip.dispose());
        };
    }, [filteredCars]); // <-- re-run every time filteredCars changes

    //3) Set initial class of the page based on `colorScheme`
    useEffect(() => {
        if(pageColorSchemeRef.current){
            pageColorSchemeRef.current.classList.remove("color-scheme--light","color-scheme--dark");
            pageColorSchemeRef.current.classList.add(`color-scheme--${colorScheme}`);
        }
    }, [colorScheme]);

    //Reset all Fiilters State:
    const handleResetFilters = () =>{ dispatch(resetFilters()); };
    //Toggle (change) Color Scheme of Page:
    const toggleColorScheme = () =>{ 
        if( pageColorSchemeRef.current ){
            pageColorSchemeRef.current.classList.toggle("color-scheme--light");
            pageColorSchemeRef.current.classList.toggle("color-scheme--dark");
        }
        if( pageColorSchemeRef.current ){ //--> OLD functionality before using `localStorage`
            //if( pageColorSchemeRef.current.classList.contains("color-scheme--light") ){
            //setColorScheme("light");
            //}else{ setColorScheme("dark"); }
        }
        if( pageColorSchemeRef.current ){ //update State & localStorage
            const newScheme = pageColorSchemeRef.current.classList.contains("color-scheme--light") ? "light" : "dark";
            setColorScheme(newScheme);
            localStorage.setItem("colorScheme", newScheme);
        }
    }; //console.log(colorScheme);
    
    //Sort Order by `Price`: Low --> High | High --> Low
    const handleSortClick = () => {
        let newOrder: "asc" | "desc";
        if( sortOrder === "none" || sortOrder === "desc" ){ newOrder = "asc"; } 
        else{ newOrder = "desc"; } 
        setLocalSortOrder(newOrder);
        dispatch(setSortOrder(newOrder));
    };
      
    console.log("Currently applied filters:", { 
        selectedMake,selectedModel,selectedYear,selectedBodyStyle,selectedFuelType,selectedMileage,selectedPrice
    }); console.log(sortOrder);


    return(
    <div ref={pageColorSchemeRef} className="usedcar--page color-scheme--light pt-lg-4 pt-md-4 pt-sm-4 pt-3"> {/*color-scheme--dark | color-scheme--light*/} 
        <div className="container-lg py-lg-4 py-md-4 py-sm-2">
            <div className="usedcar--page-titles"> 
                <h1 className="text-center">Welcome to our <strong>Used Cars</strong> Storage</h1> 
                <p className="text-center">Only <strong>Recent</strong> Model Cars</p>
            </div>
            <hr /> 
            <div className="total-cars--info text-center">Total Cars:
                <strong className="ps-2">{allCars.length}</strong> 
                <Button as="button" 
                    className="btn color-scheme" 
                    text=""
                    onClick={toggleColorScheme} 
                >{ (colorScheme === "light") ? <i className="fa fa-moon-o text-black" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Toggle Theme"></i>
                    : <i className="fa fa-sun-o" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Toggle Theme"></i> } 
                </Button>  
            </div> 
        </div>

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 py-2">
            <div className="row">
                {/*Sidebar*/}
                <aside className="col-lg-3 sidebar">
                    {/*Filters Widgets*/}
                    <section className="filters-section">
                        <div className="filters-section-caption">
                            <i className="fa fa-filter"></i>FILTERS
                        </div>
                        <div className="text-center reset-btn-container">
                                <Button as="button" className="btn-reset-all-filters btn btn-warning mt-2 mb-2 px-2" onClick={handleResetFilters} text="Reset Filters"></Button>
                                <Button as="button" className=" btn btn-warning mt-2 mb-2 px-2 ms-2" text={filteredCars.length}></Button> 
                        </div>
                        <div className="accordion" id="filters-car--accordion">
                            <div className="accordion-item filter-make-and-modal">
                                <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-1" aria-expanded="true" aria-controls="panelsStayOpen-panelsStayOpen-1">
                                    Make & Model
                                </button>
                                </h2>
                                <div id="panelsStayOpen-1" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <FilterMake />
                                        <FilterModel />
                                        {/*<FilterSidebar />*/}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-year">
                                <h2 className="accordion-header">
                                <button className={`accordion-button ${ selectedYear !== null ? "" : "collapsed" }`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-2" aria-expanded="false" aria-controls="panelsStayOpen-2">
                                    Year
                                </button> 
                                </h2>
                                <div id="panelsStayOpen-2" className={`accordion-collapse collapse ${ selectedYear !== null ? "show" : "" }`}>  
                                    <div className="accordion-body">
                                        <FilterYear /> 
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-bodystyle">
                                <h2 className="accordion-header"> 
                                <button className={`accordion-button ${ selectedBodyStyle !== null ? "" : "collapsed" }`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-3" aria-expanded="false" aria-controls="panelsStayOpen-3">
                                    Body Style
                                </button>
                                </h2>
                                <div id="panelsStayOpen-3" className={`accordion-collapse collapse ${ selectedBodyStyle !== null ? "show" : "" }`}>
                                    <div className="accordion-body">
                                        <FilterBodyStyle />
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-fueltype">
                                <h2 className="accordion-header"> 
                                <button className={`accordion-button ${ selectedFuelType !== null ? "" : "collapsed" }`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-7" aria-expanded="false" aria-controls="panelsStayOpen-7">
                                    Fuel Type
                                </button>
                                </h2>
                                <div id="panelsStayOpen-7" className={`accordion-collapse collapse ${ selectedFuelType !== null ? "show" : "" }`}>
                                    <div className="accordion-body">
                                        <FilterFuelType />
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-mileage">
                                <h2 className="accordion-header"> 
                                <button className={`accordion-button ${ selectedMileage !== null ? "" : "collapsed" }`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-5" aria-expanded="false" aria-controls="panelsStayOpen-5">
                                    Mileage (km)
                                </button>
                                </h2>
                                <div id="panelsStayOpen-5" className={`accordion-collapse collapse ${ selectedMileage !== null ? "show" : "" }`}>
                                    <div className="accordion-body">
                                        <FilterMileage />
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-price"> 
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-8" aria-expanded="false" aria-controls="panelsStayOpen-8">
                                    Price ($)
                                </button>
                                </h2>
                                <div id="panelsStayOpen-8" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                            <FilterPrice />
                                    </div>
                                </div>
                            </div>
                        </div> {/*.accordion*/}
                        <div className="text-center reset-btn-container">
                                <Button as="button" className="btn-reset-all-filters btn btn-warning mt-2 px-2" onClick={handleResetFilters} text="Reset Filters"></Button> 
                                <Button as="button" className=" btn btn-warning mt-2 px-2 ms-2" text={filteredCars.length}></Button> 
                        </div>
                    </section>
                    {/*__/Filters Widgets*/}
                </aside>
                    {/*__/Sidebar*/}

                {/*Car's list*/}
                <aside className="cars col-lg-9 mt-lg-0 mt-sm-4 mt-3">
                    <section className="cars-sorting border rounded p-3 mb-4"> 
                        <i className="fa fa-sort me-1" style={{ fontSize:"1.5rem" }}></i> Sort by:  
                        <Button 
                        as="button" 
                        className="sort price-sort ms-2 me-2" 
                        text=""
                        onClick={handleSortClick}
                        ><i className={`fa ${ sortOrder === "none" ? "fa-sort" : sortOrder === "asc" ? "fa-sort-amount-asc" : "fa-sort-amount-desc" }`}></i></Button> 

                        { (sortOrder === "none" ) ? <span>p r i c e</span>  
                          : (sortOrder === "asc") ? <span>Low<i className="fa fa-caret-right mx-1"></i>High</span>
                          : <span>High<i className="fa fa-caret-right mx-1"></i>Low</span> } 

                        {/*<Button as="button" className="sort year-sort" text=""><i className="fa fa-sort-alpha-desc"></i></Button> */}

                        <div className="favorites-btn-container add-to-favorite" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Favorite Cars"> 
                            { favorites.length > 0 && ( 
                                <Link to="/used-cars/favorite" className="favorites-btn add-to-favorite fa fa-heart"></Link>
                            ) } 
                            { favorites.length > 0 && (<sub>{favorites.length}</sub>) }  
                        </div>
                    </section>
                    <section className="cars-section">
                        <CarList /> {/*<CarList cars={filteredCars} /> */}
                    </section> {/*.cars-section*/}
                </aside>
                {/*__/Car's list*/}
            </div> {/*.row*/}
        </div> {/*.container*/}
            
    </div> //.usedcar--page
    ); 
}
export default UsedCars;