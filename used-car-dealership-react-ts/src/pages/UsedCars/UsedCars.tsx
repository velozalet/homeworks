import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store"; 
import { selectMake } from "../../store/carsSlice";
import { fetchCars } from "../../services/carService";
import { setCars } from "../../store/carsSlice";

//Components:
import Button from '../../components/Button/Button';
import FilterMake from "../../components/Filters/FilterMake";
import CarList from "../../components/CarList/CarList";

//Styles:
import './UsedCars.css';

function UsedCars(){
    const dispatch = useDispatch();

    const selectedMake = useSelector((state: RootState) => state.cars.selectedMake);
    const filteredCars = useSelector((state: RootState) => state.cars.filteredCars);

    useEffect(() => {
        //Bootstrap is loaded from CDN, so use window.bootstrap --> for Bootstrap `Tooltip`
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        //@ts-ignore because TS doesn't know bootstrap is on window
        tooltipTriggerList.forEach((tooltipTriggerEl) =>{ new window.bootstrap.Tooltip(tooltipTriggerEl); });

            //TODO: Fetch from Firestore
            /*setCars([
                { id: 1, make: "GMC", model: "Terrain" },
                { id: 2, make: "Chevrolet", model: "Malibu" },
                { id: 3, make: "Buick", model: "Enclave" }
            ]);*/
    }, []);

    useEffect(() => { 
        async function loadCars() {
          try {
            const cars = await fetchCars();
            dispatch(setCars(cars));
          } catch (error) {
            console.error("Error loading cars:", error);
          }
        }
        loadCars();
    }, [dispatch]);


    return(
    <div className="usedcar--page color-scheme--light"> {/*color-scheme--dark | color-scheme--light*/}
        <div className="contactus--page">
            <h1 style={{textAlign:'center',color:'green'}}>Welcome to the `Used Cars` Page</h1>
            <p>Lorem ipsum dolor sit amet.... <strong>`Used Cars` Page</strong></p> 
        </div>
        <hr />


        <div className="container-lg py-5 mb-md-4">
            <div className="row">
                {/*Sidebar*/}
                <aside className="col-lg-3 sidebar">
                    {/*Filters Widgets*/}
                    <section className="filters-section">
                        <p className="text-black">
                            <i className="fa fa-filter"></i>FILTERS.....
                            <Button as="button" className="btn btn-warning mt-3 px-4 py-2" text="Apply Filters"></Button> 
                        </p>
                        <div className="accordion" id="filters-car--accordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-1" aria-expanded="true" aria-controls="panelsStayOpen-panelsStayOpen-1">
                                    Make & Model
                                </button>
                                </h2>
                                <div id="panelsStayOpen-1" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <FilterMake
                                            selectedMake={selectedMake || ""}
                                            onChange={(value) => dispatch(selectMake(value || null))}
                                        />
                                        <select className="form-select mt-2" aria-label="Model">
                                            <option value="anymodel">Any Model</option>
                                            <option value="gmc">Buick Encore GX</option>
                                            <option value="chevrolet">Chevrolet Traverse</option>
                                            <option value="buick">GMC Sierra 1500</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-2" aria-expanded="false" aria-controls="panelsStayOpen-2">
                                    Year
                                </button>
                                </h2>
                                <div id="panelsStayOpen-2" className="accordion-collapse collapse"> 
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Year">
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-bodystyle">
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-3" aria-expanded="false" aria-controls="panelsStayOpen-3">
                                    Body Style
                                </button>
                                </h2>
                                <div id="panelsStayOpen-3" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Body Style">
                                            <option value="sedan">Sedan</option>
                                            <option value="suv">SUV</option>
                                            <option value="hatch">Hatch</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-color">
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-4" aria-expanded="false" aria-controls="panelsStayOpen-4">
                                    Color
                                </button>
                                </h2>
                                <div id="panelsStayOpen-4" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Color">
                                            <option value="anycolor">Any Color</option>
                                            <option value="white">White</option>
                                            <option value="black">Black</option>
                                            <option value="green">Green</option>
                                            <option value="red">Red</option>
                                            <option value="blue">Blue</option>
                                            <option value="gray">Gray</option>
                                            <option value="yellow">Yellow</option>
                                            <option value="metallic">Metallic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-mileage">
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-5" aria-expanded="false" aria-controls="panelsStayOpen-5">
                                    Mileage (km)
                                </button>
                                </h2>
                                <div id="panelsStayOpen-5" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Mileage">
                                            <option value="mileage_cat_1">10k - 25k</option>
                                            <option value="mileage_cat_2">25k - 40k</option>
                                            <option value="mileage_cat_3">40k - 60k</option>
                                            <option value="mileage_cat_4">60k - 85k</option>
                                            <option value="mileage_cat_5">86k & over</option> 
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-mileage">
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-6" aria-expanded="false" aria-controls="panelsStayOpen-6">
                                    Transmission
                                </button>
                                </h2>
                                <div id="panelsStayOpen-6" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Transmission">
                                            <option value="automatic">Automatic</option>
                                            <option value="manual">Manual</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-mileage">
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-7" aria-expanded="false" aria-controls="panelsStayOpen-7">
                                    Fuel Type
                                </button>
                                </h2>
                                <div id="panelsStayOpen-7" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        <select className="form-select mt-2" aria-label="Fuel Type">
                                            <option value="gas">Gas</option>
                                            <option value="diesel">Diesel</option>
                                          </select>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item filter-price"> 
                                <h2 className="accordion-header"> 
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-8" aria-expanded="false" aria-controls="panelsStayOpen-8">
                                   Price
                                </button>
                                </h2>
                                <div id="panelsStayOpen-8" className="accordion-collapse collapse">
                                    <div className="accordion-body">
                                        {/* <input type="range" className="form-range" min="0" max="90000" id="filter_price" /> */}
                                        <select className="form-select mt-2" aria-label="Price">
                                            <option value="price_cat_1">10.000 - 25.000</option>
                                            <option value="price_cat_2">25.000 - 40.000</option>
                                            <option value="price_cat_3">40.000 - 55.000</option>
                                            <option value="price_cat_4">55.000 - 70.000</option>
                                            <option value="price_cat_5">71.000 & over</option> 
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div> {/*.accordion*/} 

                        <Button as="button" className="btn btn-warning mt-3 px-4 py-2" text="Apply Filters"></Button> 
                    </section>
                    {/*__/Filters Widgets*/}
                </aside>
                 {/*__/Sidebar*/}

                {/*Car's list*/}
                <aside className="cars col-lg-9">
                    <section className="cars-sorting border rounded p-3 mb-4">
                        <i className="fa fa-sort"></i>Sort by: <i className="fa fa-sort-alpha-asc"> </i> <i className="fa fa-sort-alpha-desc"></i> 
                    </section>

                    <section className="cars-section">
                        <CarList /> {/*<CarList cars={filteredCars} /> */}
                    </section> {/*.cars-section*/}
                </aside>
                {/*__/Car's list*/}
            </div> {/*.row*/}
        </div> {/*.container*/}
        
    </div> 
    ); 
}
export default UsedCars;