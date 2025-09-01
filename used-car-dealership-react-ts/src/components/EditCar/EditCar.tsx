//import React from 'react';
import { useState,useEffect } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCar,uploadCarImage } from "../../services/carService";

import type { RootState,AppDispatch } from "../../store/store"; 
import type { Car } from "../../types/car";
import { setCars,setLoading } from "../../store/carsSlice";
import { fetchCars,updateCar } from "../../services/carService";

import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models
import { bodyStyles } from "../../constants/bodyStyles"; //Array of strings with car's Body Styles
import { carYears } from "../../constants/carYears"; //Array of numbers with car's Years
import { fuelType } from "../../constants/fuelType"; //Array of strings with car's fuel Type
//import { mileageRanges } from "../../constants/mileageRanges"; Array of Objs with car's Mileage Ranges
import { transmission } from "../../constants/transmission"; //Array of strings with car's Transmission
import { color } from "../../constants/color"; //Array of strings with car's Color

import { capitalize } from "../../utils/helpers.ts"; 

//Components:
//Styles:
import './EditCar.css';

//Images:

const EditCar = (): JSX.Element => {
  // Local state for editing
  const [formData, setFormData] = useState<Car | null>(null);//const [formData, setFormData] = useState<Partial<Car>>({}); //

    const {carId} = useParams<{ carId:string }>(); 
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const navigate = useNavigate();
    //2) Get all cars from Redux
    const allCars = useSelector((state: RootState) => state.cars.allCars); //Get all Cars array from `Redux Store` -->  console.log(allCars);

    const [loadingFlag, setloadingFlag] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    //State for `Options`:
    const [optionInput, setOptionInput] = useState(""); //const [options, setOptions] = useState<string[]>([]);
    //State for `Safety`:
    const [safetyInput, setSafetyInput] = useState("");
    //State for `Images`:
    const [imageInput, setImageInput] = useState(""); 


    //-->Get list of Makes
    const car_makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick'] 
    //-->Get list of Models according to before selected Makes
    let car_models: string[];
    if(formData){
        if( !formData.make ){ car_models = []; }  //case-1: no `Make` chosen
        else if( !carMakesAndModels[formData.make] ){ car_models = []; } //case-2: `Make` chosen but not in our dictionary
        else{  car_models = carMakesAndModels[formData.make]; } //case-3: make chosen and exists in dictionary
    }
    //-->Get list of Years
    const car_years = carYears; //-->[2025, 2024, 2023, 2022, 2021, 2020]
    //-->Get list of Body Styles 
    const car_bodystyles = bodyStyles; //-->['sedan', 'suv', 'hatch']
    //-->Get list of Color 
    const car_colors = color; //-->['black', 'white', 'blue', 'red', 'green', 'yellow']
    //-->Get list of Transmission 
    const car_transmissions = transmission; //-->['auto', 'manual']
    //-->Get list of Fuel Type 
    const car_fueltypes = fuelType; //-->['gas', 'diesel']
    //-->Get list of Mileage Ranges ==> no need!

    //After 4 sec. the notification`Car created successfully!`will br desappeard
    useEffect(() => {
        if( !successMsg ) return;
        const timer = setTimeout(
            ()=>{ return setSuccessMsg("") }, 4000 
        );

        return () => { clearTimeout(timer) }; //--> UNMOUNTS: cleans the timer 
    }, [successMsg]); 


    //1) Load cars from Firebase DB 
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
        loadCars(); //if (allCars.length === 0) {  loadCars();   }
    }, [dispatch]); //[dispatch, allCars.length]);

    //3) Find the car by ID
    const car = allCars.find(
        (item_car) => { return item_car.id === carId }
    );
    //3.1) If no `car` set it form `setFormData(car)`
    useEffect(() => { 
        if(car) { setFormData(car); }
      },[car]);

    //4) Handle input changes
    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
        const { name,value,type,checked } = e.target;
        setFormData((prev) =>
          prev
            ? {
                ...prev,
                [name]:
                  type === "checkbox"
                    ? checked
                    : name === "year" || name === "mileage" || name === "price"
                    ? Number(value)
                    : value,
              }
            : null
        );
      };

  //5. Save/update car
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloadingFlag(true);
    try {
      if (formData) {
        await updateCar(formData.id, formData);
        //alert("Car updated successfully!");
        setSuccessMsg(`✅ Car updated successfully!`);
      }
    } catch (err) { 
      console.error("Error updating car:", err);
    }
    setloadingFlag(false);
  };

    {/*OPTIONS*/}
    const addOption = () => {
        if (optionInput.trim() !== "") {
            setFormData((prev) =>
            prev ? { ...prev, options: [...prev.options, optionInput.trim()] } : prev
            );
            setOptionInput("");
        }
    };
    const removeOption = (index: number) => {
        setFormData((prev) =>
            prev
            ? { ...prev, options: prev.options.filter((_, i) => i !== index) }
            : prev
        );
    };
    {/*OPTIONS*/}
    {/*SAFETY*/}
    const addSafety = () => {
        if (safetyInput.trim() !== "") {
            setFormData((prev) =>
            prev ? { ...prev, safety: [...prev.safety, safetyInput.trim()] } : prev
            );
            setSafetyInput("");
        }
    };
    const removeSafety = (index: number) => {
        setFormData((prev) =>
            prev
            ? { ...prev, safety: prev.safety.filter((_, i) => i !== index) }
            : prev
        );
    };
    {/*SAFETY*/}
    {/*IMAGES*/}
    const addImage = async (file: File) => {
        try {
            const url = await uploadCarImage(formData!.id, file);
            setFormData((prev) =>
            prev ? { ...prev, images: [...prev.images, url] } : prev
            );
        } catch (err) {
            alert("❌ Failed to upload image. Check console.");
            console.error(err);
        }
    };
    const removeImage = (index: number) => {
        setFormData((prev) =>
            prev
            ? { ...prev, images: prev.images.filter((_, i) => i !== index) }
            : prev
        );
    };
    {/*IMAGES*/}

    if( !car ){
        return( 
            <>
                <div className="container-lg text-center"> 
                    <nav className="breadcrumbs pt-lg-3 pt-md-3 pt-sm-2 pt-2" aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <Link to="/admin" className="breadcrumb-item">Admin DashsBoard</Link> 
                            <li className="breadcrumb-item active" aria-current="page">Car - {carId}</li>  
                        </ol>
                    </nav>
                    <h1 className="text-black">N-------------------</h1>
                    <p className="text-black">Car ID: {carId}</p> 
                </div>
            </>
        );
    }
    if (!formData) {
        return (
          <div className="container-lg text-center">
            <h2>Loading car data...</h2>
          </div>
        ); 
      }

    return ( // (!!!) NEEDS value={formData.model || ""} OR is as OK?
    <div id={carId} className="editcar--page container mt-4">
        <h1>Edit Car</h1>

        <form onSubmit={handleSubmit} className="edit-car--form row g-3">
            {/*Make*/}
            <div className="col-md-6">
                <label className="form-label text-black">Make</label>
                <select
                    className="form-select"
                    name="make"
                    value={formData.make || ""}
                    onChange={handleChange}
                >
                {car_makes.map( (make, index, array) => (
                    <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : capitalize(make) }</option>
                ))}
                </select> 
            </div>
            {/*Make*/}

            {/*Model*/}
            <div className="col-md-6">
                <label className="form-label text-black">Model</label>
                <select
                className="form-select"
                name="model"
                value={formData.model}
                onChange={handleChange} 
                required
                >
                { ( formData.make )  
                    ? car_models.map( (model, index, array) => (
                    <option key={model} value={model}>{ capitalize(model) }</option>
                ))
                : "" }
                </select>
            </div>
            {/*Model*/}

            {/*Year*/}
            <div className="col-md-4">
                <label className="form-label text-black">Year</label>
                <select
                className="form-select"
                name="year"
                value={formData.year}
                onChange={handleChange} 
                required
                >
                {car_years.map( (year, index, array) => (
                    <option key={year} value={year}>{ year }</option>
                ))} 
                </select>
            </div>
            {/*Year*/}

            {/*Body Style*/}
            <div className="col-md-4">
                <label className="form-label text-black">Body Style</label>
                <select
                className="form-select"
                name="bodyStyle"
                value={formData.bodyStyle}
                onChange={handleChange} 
                required
                >
                {car_bodystyles.map( (bodystyle, index, array) => (
                    <option key={bodystyle} value={bodystyle}>{ (bodystyle === "suv") ? bodystyle.toUpperCase() : capitalize(bodystyle) }</option>
                ))}
                </select>
            </div>
            {/*Body Style*/}

            {/*Color*/}
            <div className="col-md-4">
                <label className="form-label text-black">Color</label>
                <select
                className="form-select"
                name="color"
                value={formData.color}
                onChange={handleChange} 
                required
                >
                {car_colors.map( (color, index, array) => (
                    <option key={color} value={color}>{ capitalize(color) }</option>
                ))}
                </select>
            </div>
            {/*Color*/}

            {/*Mileage*/}
            <div className="col-md-4">
                <label className="form-label text-black">Mileage</label>
                <input 
                type="text" 
                name="mileage" 
                className="form-control" 
                placeholder="Mileage" 
                value={formData.mileage} 
                onChange={handleChange} 
                />
            </div> 
            {/*Mileage*/} 

            {/*Transmission*/}
            <div className="col-md-4">
                <label className="form-label text-black">Transmission</label>
                <select
                className="form-select"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange} 
                required
                >
                {car_transmissions.map( (transmission, index, array) => (
                    <option key={transmission} value={transmission}>{ capitalize(transmission) }</option>
                ))}
                </select>
            </div> 
            {/*Transmission*/}

            {/*Fuel Type*/} 
            <div className="col-md-4">
                <label className="form-label text-black">Fuel Type</label>
                <select
                className="form-select"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange} 
                required
                >
                {car_fueltypes.map( (fueltype, index, array) => (
                    <option key={fueltype} value={fueltype}>{ capitalize(fueltype) }</option>
                ))}
                </select>
            </div> 
            {/*Fuel Type*/}

            {/*Price*/}
            <div className="col-md-4">
                <label className="form-label text-black">Price($)</label>
                <input
                type="text"
                className="form-control"
                name="price"
                placeholder="Price" 
                value={formData.price}
                onChange={handleChange}
                required
                />
            </div>
            {/*Price*/}

            {/*VIN*/}
            <div className="col-md-4">
                <label className="form-label text-black">VIN</label>
                <input
                type="text"
                className="form-control"
                name="vin" 
                value={formData.vin}
                onChange={handleChange}
                required 
                />
            </div>
            {/*VIN*/}

            {/*Carfax Clear/ No Accident/ One Owner*/}
            <div className="col-md-4">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="carfaxClear"
                        name="carfaxClear"
                        checked={formData.carfaxClear}
                        onChange={handleChange}
                    />
                    <label htmlFor="carfaxClear" className="form-check-label text-black">Carfax Clear</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="noAccident"
                        name="noAccident"
                        checked={formData.noAccident}
                        onChange={handleChange}
                    />
                    <label htmlFor="carfaxClear" className="form-check-label text-black">No Accident</label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="oneOwner"
                        name="oneOwner"
                        checked={formData.oneOwner}
                        onChange={handleChange}
                    />
                    <label htmlFor="carfaxClear" className="form-check-label text-black">One Owner</label>
                </div>
            </div> 
            {/*Carfax Clear/ No Accident/ One Owner*/}

            {/*Description*/}
            <div className="col-12">
                <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                ></textarea>
            </div>
            {/*Description*/}


        {/*OPTIONS*/}
        <div className="col-12">
          <label className="form-label">Options</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Add Option"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addOption())
              }
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm ms-2"
              onClick={addOption}
            >
              +
            </button>
          </div>
          <div className="mt-2 d-flex flex-wrap gap-2">
            {formData.options.map((item, index) => (
              <span
                key={index}
                className="badge bg-secondary p-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeOption(index)}
              >
                {item} ✕
              </span>
            ))}
          </div>
        </div>
        {/*OPTIONS*/}

         {/*SAFETY*/}
         <div className="col-12">
          <label className="form-label">Safety</label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Add Safety"
              value={safetyInput}
              onChange={(e) => setSafetyInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSafety())
              }
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm ms-2"
              onClick={addSafety}
            >
              +
            </button>  
          </div>
          <div className="mt-2 d-flex flex-wrap gap-2">
            {formData.safety.map((item, index) => (
              <span
                key={index}
                className="badge bg-secondary p-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeSafety(index)}
              >
                {item} ✕
              </span>
            ))}
          </div>
        </div> 
        {/*SAFETY*/}

        {/*IMAGES*/}
        <div className="col-12">
          <label className="form-label">Images</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              if (!e.target.files?.length) return;
              addImage(e.target.files[0]);
            }}
          />
          <div className="mt-2 d-flex flex-wrap gap-2">
            {formData.images.map((item, index) => ( 
              <span
                key={index}
                className="badge bg-secondary p-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeImage(index)}
              >
                {item} ✕
              </span>
            ))}
          </div> 
        </div>  
        {/*IMAGES*/}

        
        <div className="col-12 text-center pb-5">
            {/* <button type="submit" className="btn btn-primary mt-3">Save Changes</button> */} 
            <button type="submit" className="btn btn-success" disabled={loadingFlag}>{loadingFlag ? "Saving..." : "Save Car"}</button>
        </div>
      </form>

      {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
    </div> //.editcar--page
    );
} 
export default EditCar; 
