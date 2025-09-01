import React, { useState,useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import type {  RootState, AppDispatch } from "../../../store/store"; 
import { setCars,setLoading } from "../../../store/carsSlice";
import { fetchCars } from "../../../services/carService";

import { carMakesAndModels } from "../../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

//Components:

//Images:
import no_car_image_pattern from '../../../assets/no-car-image-sm.png';


function AdminDashboard(){
    const makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick']
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const allCars = useSelector((state: RootState) => state.cars.allCars); //Get all Cars array from `Redux Store` -->  console.log(allCars);
    const gmcCars = allCars.filter( (item,index,array) => { if( item.make === 'gmc') { return item; } } ); //Get GMC Cars only
    const chevroletCars = allCars.filter( (item,index,array) => { if( item.make === 'chevrolet') { return item; } } ); //Get Chevrolet Cars only
    const buickCars = allCars.filter( (item,index,array) => { if( item.make === 'buick') { return item; } } ); //Get Buick Cars only

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

    useEffect(() => { //2) Init Bootstrap popover
        if (!allCars.length) return; //No elements(Cars) yet
        //grab all popover elements
        //@ts-ignore
        const popoverTriggerList = [...document.querySelectorAll('[data-bs-toggle="popover"]')]
          .map( 
            (el) => { 
                return new window.bootstrap.Popover(el, { html: true, } ) //allow HTML content inside popover
            }
        );

        return () => {//cleanup on unmount
          popoverTriggerList.forEach((popover: any) => popover.dispose());
        };
      }, [allCars]); // pass in deps like [filteredCars] or [] for init once


    return(
    <div className="admindashboard--page"> 
        <h1>Dashboard: Car List</h1> 

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 py-2">
            <div className="row">
            <div className="total-cars--info text-center text-black pb-5">Total Cars: <strong>{allCars.length}</strong></div>  

                <section className="cars-section"> 
                    <div className="tabs--dispaly-cars text-center">
                        {/*Tab Buttons*/}
                        <div className="tab--button flex justify-center mb-4">
                            {makes.map((item,index,array) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 border rounded-t-lg mx-1 transition 
                                ${activeTab === index ? "bg-white text-black active" : "bg-black text-white"}`}
                            >{item} - 
                            { (item === 'gmc') ? <strong>{gmcCars.length}</strong> 
                              : (item === 'chevrolet') ? <strong>{chevroletCars.length}</strong> 
                              : <strong>{buickCars.length}</strong> 
                            }
                            </button>
                            ))}
                        </div>
                         {/*Tab Buttons*/}

                        {/*Tab Content*/}
                        <div className={`tab--content p-4 ${activeTab === 0 ? "active" : ""}`}> 
                            <ol> 
                            {gmcCars.map( (item) => ( 
                                <li key={item.id}>
                                    <div id={item.id} className="mb-5">  
                                        <button 
                                        type="button" 
                                        className="btn btn-lg btn-warning btn-car--rack" 
                                        data-bs-toggle="popover" 
                                        data-bs-title={`<a href="/admin/${item.id}" class="btn">🔧 Edit Car</a>`} 
                                        data-bs-content={`<a href="/admin/${item.id}" class="btn">🗑️ Delete Car</a>`}  
                                        >
                                            <div className="row"> 
                                                <div className="col col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col col-btn--info">  
                                                    <h5> <strong>{item.make} {item.model}</strong>, <i>{item.year}</i></h5>
                                                    <p className="py-0 my-0">{item.mileage} km</p>
                                                    <p className="py-0 my-0">{item.vin}</p>
                                                    <p className="py-0 my-0"> <strong>${item.price?.toLocaleString() || "N/A"}</strong></p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </li>
                            ))}
                            </ol>
                        </div> {/*.tab--content*/}
                        {/*Tab Content*/}
                        {/*Tab Content*/} chevroletCars
                        <div className={`tab--content p-4 ${activeTab === 1 ? "active" : ""}`}>
                            <ol> 
                            {chevroletCars.map( (item) => ( 
                                <li key={item.id}>
                                    <div id={item.id} className="mb-5">  
                                        <button 
                                        type="button" 
                                        className="btn btn-lg btn-warning btn-car--rack" 
                                        data-bs-toggle="popover" 
                                        data-bs-title={`<a href="/admin/${item.id}" class="btn">🔧 Edit Car</a>`} 
                                        data-bs-content={`<a href="/admin/${item.id}" class="btn">🗑️ Delete Car</a>`}  
                                        >
                                            <div className="row"> 
                                                <div className="col col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col col-btn--info">  
                                                    <h5> <strong>{item.make} {item.model}</strong>, <i>{item.year}</i></h5>
                                                    <p className="py-0 my-0">{item.mileage} km</p>
                                                    <p className="py-0 my-0">{item.vin}</p>
                                                    <p className="py-0 my-0"> <strong>${item.price?.toLocaleString() || "N/A"}</strong></p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </li>
                            ))}
                            </ol>
                        </div> {/*.tab--content*/}
                        {/*Tab Content*/}
                        {/*Tab Content*/}
                        <div className={`tab--content p-4 ${activeTab === 2 ? "active" : ""}`}>
                            <ol> 
                            {buickCars.map( (item) => ( 
                                <li key={item.id}>
                                    <div id={item.id} className="mb-5">  
                                        <button 
                                        type="button" 
                                        className="btn btn-lg btn-warning btn-car--rack" 
                                        data-bs-toggle="popover" 
                                        data-bs-title={`<a href="/admin/${item.id}" class="btn">🔧 Edit Car</a>`} 
                                        data-bs-content={`<a href="/admin/${item.id}" class="btn">🗑️ Delete Car</a>`}  
                                        >
                                            <div className="row"> 
                                                <div className="col col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col col-btn--info">  
                                                    <h5> <strong>{item.make} {item.model}</strong>, <i>{item.year}</i></h5>
                                                    <p className="py-0 my-0">{item.mileage} km</p>
                                                    <p className="py-0 my-0">{item.vin}</p>
                                                    <p className="py-0 my-0"> <strong>${item.price?.toLocaleString() || "N/A"}</strong></p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </li>
                            ))}
                            </ol>
                        </div> {/*.tab--content*/}
                        {/*Tab Content*/}
                    </div>
                </section> {/*.cars-section*/}


            </div> {/*.row*/} 
        </div> {/*.container*/}
    </div> //.admindashboard--page 
    ); 
}
export default AdminDashboard;