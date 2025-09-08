import React, { useState,useEffect,useRef,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import type {  RootState, AppDispatch } from "../../../store/store"; 
import { setCars,setLoading } from "../../../store/carsSlice";
import { fetchCars } from "../../../services/carService";
import { deleteCar } from "../../../services/carService";

import { carMakesAndModels } from "../../../constants/carMakesAndModels";

//Components:

//Images:
import no_car_image_pattern from '../../../assets/no-car-image-sm.png';


function AdminDashboard(){
    const makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick']
    const [activeTab, setActiveTab] = useState(0);
    const [carToDelete, setCarToDelete] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>(); 
    const allCars = useSelector((state: RootState) => state.cars.allCars); //Get all Cars array from `Redux Store` -->  console.log(allCars);
    const gmcCars = allCars.filter( (item,index,array) => { if( item.make === 'gmc') { return item; } } ); //Get GMC Cars only
    const chevroletCars = allCars.filter( (item,index,array) => { if( item.make === 'chevrolet') { return item; } } ); //Get Chevrolet Cars only
    const buickCars = allCars.filter( (item,index,array) => { if( item.make === 'buick') { return item; } } ); //Get Buick Cars only

    //Delete Car by ID: 1.Confirm deleting via Modal Window
    const handleDelete = useCallback((carId: string) => {
        setCarToDelete(carId); //store carId for confirmation
        const modalEl = document.getElementById("deleteCarModal");
        if(modalEl) { 
            const modal = new window.bootstrap.Modal(modalEl); modal.show(); 
        }
    }, []); 
    //Delete Car by ID: 2.Confirm delete inside Modal Window
    const confirmDelete = async () => {
        if( !carToDelete ) return;
        try{
            await deleteCar(carToDelete);
            const updated = allCars.filter((c) => c.id !== carToDelete);
            dispatch(setCars(updated));
        }catch(err){
            console.error("Failed to delete car:", err);
            alert("Could not delete car — check console.");
        }
        setCarToDelete(null);
        const modalEl = document.getElementById("deleteCarModal");
        if(modalEl){
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            modal?.hide();

            setTimeout( () => {
                (document.activeElement as HTMLElement)?.blur();
                document.body.focus(); // or focus a safe button in your UI
            }, 100);
        }
    };  

    //Load cars from Firebase DB
    useEffect(() => {
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
 
    //Init Bootstrap Popover
    useEffect(() => {
        if (!allCars.length) return;
        //@ts-ignore
        const triggerEls = [...document.querySelectorAll('[data-bs-toggle="popover"]')];
        const popovers = triggerEls.map(el =>
            new window.bootstrap.Popover(el, { html: true, sanitize: false })
        );
      
        const onDocClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (!target) return;
      
          // works only if popover is open and rendered
          if (target.matches('[data-action="delete-car"], [data-action="delete-car"] *')) {
            e.preventDefault();
            const btn = target.closest('[data-action="delete-car"]') as HTMLElement | null;
            if(btn) {
                const carId = btn.getAttribute("data-id");
                if (carId) handleDelete(carId);
            }
          }
        };
      
        document.addEventListener("click", onDocClick);
      
        return () => {
            popovers.forEach((p: any) => p.dispose());
            document.removeEventListener("click", onDocClick);
        };
    }, [allCars, handleDelete]);
      
    //Init Bootstrap Popover: Provide `Delete handler` globally so popover button can call it!
    useEffect(() => {
        (window as any).handleCarDelete = (carId: string) => handleDelete(carId);
    }, [allCars]); 


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

                        {/*Tab Content --> GMC*/}
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
                                        data-bs-content={`<a href="#" class="btn" data-action="delete-car" data-id="${item.id}">🗑️ Delete Car</a>`}
                                        >
                                            <div className="row"> 
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--info">  
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
                        {/*Tab Content --> Chevrolet*/}
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
                                        data-bs-content={`<a href="#" class="btn" data-action="delete-car" data-id="${item.id}">🗑️ Delete Car</a>`}
                                        >
                                            <div className="row"> 
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--info">
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
                        {/*Tab Content --> Buick*/}
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
                                        data-bs-content={`<a href="#" class="btn" data-action="delete-car" data-id="${item.id}">🗑️ Delete Car</a>`}
                                        >
                                            <div className="row"> 
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--bg"> 
                                                    <img className="img-fluid" src={ item.images?.[0] || no_car_image_pattern } alt={item.model || "Car"} />
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 col-btn--info">  
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

                {/*Modal*/}
                <div className="modal fade" id="deleteCarModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="deleteCarModalLabel" aria-hidden="true"> 
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black" id="deleteCarModalLabel">Deleting  Car...</h5>  
                            </div>
                        <div className="modal-body text-black"><p>Are you sure you want to delete this car?</p></div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={confirmDelete}>Confirm</button> 
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">CANCEL</button> 
                            </div>
                        </div>
                    </div>
                </div>
                {/*Modal*/}

            </div> {/*.row*/} 
        </div> {/*.container*/}
    </div> //.admindashboard--page 
    ); 
}
export default AdminDashboard;