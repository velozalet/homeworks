import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

//Components:
import Button from '../../components/Button/Button';
import FilterMake from "../../components/Filters/FilterMake";
import CarList from "../../components/CarList/CarList";

//Styles:
import './UsedCars.css';

function UsedCars(){
    const [cars, setCars] = useState<any[]>([]);
    const [selectedMake, setSelectedMake] = useState("");

    useEffect(() => {
        //Bootstrap is loaded from CDN, so use window.bootstrap --> for Bootstrap `Tooltip`
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        //@ts-ignore because TS doesn't know bootstrap is on window
        tooltipTriggerList.forEach((tooltipTriggerEl) =>{ new window.bootstrap.Tooltip(tooltipTriggerEl); });

        // TODO: Fetch from Firestore
        setCars([
            { id: 1, make: "GMC", model: "Terrain" },
            { id: 2, make: "Chevrolet", model: "Malibu" },
            { id: 3, make: "Buick", model: "Enclave" }
          ]);
    }, []);

      
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
                                        <select className="form-select" aria-label="Make">
                                            <option value="anymake" selected>Any Make</option>
                                            <option value="gmc">GMC</option>
                                            <option value="chevrolet">Chevrolet</option>
                                            <option value="buick">Buick</option> 
                                        </select>
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
                    </section>
                    {/*__/Filters Widgets*/}
                </aside>
                 {/*__/Sidebar*/}

                {/*Car's list*/}
                <aside className="cars col-lg-9">
                    <section className="cars-sorting bg-body-tertiary border rounded p-3 mb-4 text-black">
                        <i className="fa fa-sort"></i>Sort by: <i className="fa fa-sort-alpha-asc"> </i> <i className="fa fa-sort-alpha-desc"></i> 
                    </section>

                    <section className="cars-section">
                        <div className="row cars-grid justify-content-center">

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">Chevrolet Traverse</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>9,250
                                                <Link to={`/used-cars/${1}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2016</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Manual</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">96,6k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">Red</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">Sedan</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">GMC Sierra 1500</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>16,759 
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${2}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2019</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Disel</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Manual</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">90,2k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">White</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">SUV</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">Chevrolet Equinox</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>20,800
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${3}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2019</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Auto</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">43,6k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">Black</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">Hatch</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">Buick Encore GX</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>39,600
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${4}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2025</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Auto</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">32,3k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">Black</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">Hatch</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">GMC Terrain</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>23,999
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${5}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2021</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Auto</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">76,6k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">Red</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">SUV</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">Buick Encore GX</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>24,900
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${6}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2021</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Auto</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">51,8k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">Black</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">Hatch</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>

                            <div className="col-sm-10 col-md-6 mb-4 mx-auto mx-md-0">
                                <div className="card card--car">
                                    <img src="https://www.themecrest.top/templates/carmart/demo/images/cars/bmw-x5/01.jpg" className="card-img-top img-fluid" alt="A Car" />
                                    <div className="card-body"> {/*bg-dark*/} 
                                        <h5 className="card-title">Chevrolet Malibu</h5> {/*text-white|text-black|text-warning*/}
                                        <h5 className="card-title card-title--price">
                                            <p className="car-price text-primary fs-special fs-5 fw-bold"> {/*text-white|text-primary|text-black|text-warning|text-danger*/}
                                                <i className="fa fa-dollar pe-1"></i>16,300
                                                {/* <Link to="/used-cars" className="btn btn-warning view-car--btn">View Car</Link> */}
                                                <Link to={`/used-cars/${7}`} className="btn btn-warning view-car--btn">View Car</Link>
                                            </p>
                                        </h5>
                                        <hr className="mt-4 hr--decor" /> {/*text-white*/} 
                                        <div className="card-text pt-2 row row-cols-3 g-2"> 
                                            <div className="params _year">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm" 
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="year of car production"
                                                > <i className="fa fa-calendar-check-o"></i><span className="txt ps-1">2017</span>
                                                </span> 
                                            </div>
                                            <div className="params _fuel">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="fuel type"
                                                ><i className="fa fa-tint"></i> <span className="txt ps-1">Gas</span> 
                                                </span>
                                            </div>
                                            <div className="params _transmission"> 
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="transmission type"
                                                ><i className="fa fa-gears"></i> <span className="txt ps-1">Manual</span>
                                                </span>
                                            </div>
                                            <div className="params _odo">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-1 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car mileage(km)"
                                                ><i className="">km</i>&nbsp;<span className="txt ps-1">80,1k <span></span> </span>
                                                </span>
                                            </div>
                                            <div className="params _color">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="car color"
                                                ><i className="fa fa-eye"></i> <span className="txt ps-1">White</span>
                                                </span>
                                            </div>
                                            <div className="params _bodystyle">
                                                <span className="icon-wrapper d-inline-flex align-items-center p-2 me-1 bg-body-secondary rounded-1 text-body-secondary bg-opacity-75 w-100 fs-sm"
                                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="body style"
                                                ><i className="fa fa-car"></i> <span className="txt ps-1">Sedan</span>
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {/*<button className="add-to-favorite fa fa-heart-o"></button> on click --> to change class to `fa-heart`*/}
                                    <Button className="add-to-favorite fa fa-heart-o" text=""></Button>  
                                </div>
                            </div>
  
                        </div> {/*row*/} 
                    </section> {/*.cars-section*/}
                </aside>
                {/*__/Car's list*/}
            </div> {/*.row*/}
        </div> {/*.container*/}
        
    </div> 


    ); 
}
export default UsedCars;