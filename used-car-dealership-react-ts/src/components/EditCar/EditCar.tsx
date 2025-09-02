//import React from 'react';
import { useState,useEffect } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createCar,uploadCarImage } from "../../services/carService";

import type { RootState,AppDispatch } from "../../store/store"; 
import type { Car } from "../../types/car";
import { setCars,setLoading } from "../../store/carsSlice";
import { fetchCars,updateCar } from "../../services/carService";


import __Make from "./__Make";
import __Model from "./__Model";
import __Year from "./__Year";
import __BodyStyle from "./__BodyStyle";
import __Color from "./__Color";
import __Mileage from "./__Mileage";
import __Transmission from "./__Transmission";
import __FuelType from "./__FuelType";
import __Price from "./__Price";
import __Vin from "./__Vin";
import __CarfaxClear from "./__CarfaxClear";
import __NoAccident from "./__NoAccident";
import __OneOwner from "./__OneOwner";
import __Description from "./__Description";
import __Options from "./__Options";
import __Safety from "./__Safety";
import __Images from "./__Images";
import __SaveButton from "./__SaveButton";

//import { capitalize } from "../../utils/helpers.ts"; 

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

    if( !car ){ return( <><p className="text-black">Car ID: {carId}</p></> ); }
    if (!formData) {
        return ( <div className="container-lg text-center"><h2>Loading car data...</h2></div> ); 
    }

    return (
    <div id={carId} className="editcar--page container mt-4">
        <h1>Edit Car</h1>

        <form onSubmit={handleSubmit} className="edit-car--form row g-3">
            {/*Make*/}
            <__Make value={formData.make || ""} onChange={handleChange} />
            {/*Make*/}
            {/*Model*/}
            <__Model make={formData.make || ""} model={formData.model || ""} onChange={handleChange} />
            {/*Model*/}
            {/*Year*/}
            <__Year value={formData.year || ""} onChange={handleChange} />
            {/*Year*/}
            {/*Body Style*/}
            <__BodyStyle value={formData.bodyStyle || ""} onChange={handleChange} />
            {/*Body Style*/}
            {/*Color*/}
            <__Color value={formData.color || ""} onChange={handleChange} />
            {/*Color*/}
            {/*Mileage*/}
            <__Mileage value={formData.mileage || "" } onChange={handleChange} />
            {/*Mileage*/} 
            {/*Transmission*/}
            <__Transmission value={formData.transmission || "" } onChange={handleChange} />
            {/*Fuel Type*/}
            <__FuelType value={formData.fuelType || "" } onChange={handleChange} />
            {/*Fuel Type*/}
            {/*Price*/}
            <__Price value={formData.price || "" } onChange={handleChange} />
            {/*Price*/}
            {/*VIN*/}
            <__Vin value={formData.vin || "" } onChange={handleChange} />
            {/*VIN*/}
            {/*Carfax Clear/ No Accident/ One Owner*/}
            <div className="col-md-4">
                <__CarfaxClear value={formData.carfaxClear || "" } onChange={handleChange} />
                <__NoAccident value={formData.noAccident || "" } onChange={handleChange} />
                <__OneOwner value={formData.oneOwner || "" } onChange={handleChange} />
            </div> 
            {/*Carfax Clear/ No Accident/ One Owner*/}
            {/*Description*/}
            <__Description value={formData.description || "" } onChange={handleChange} />
            {/*Description*/}

            {/*OPTIONS*/}
            <__Options
                options={formData.options}
                optionInput={optionInput}
                setOptionInput={setOptionInput}
                addOption={addOption}
                removeOption={removeOption}
            />
            {/*OPTIONS*/}
            {/*SAFETY*/}
            <__Safety
                safety={formData.safety}
                safetyInput={safetyInput}
                setSafetyInput={setSafetyInput}
                addSafety={addSafety}
                removeSafety={removeSafety}
            />
            {/*SAFETY*/}

            {/*IMAGES*/}
            <__Images
                images={formData.images}
                addImage={addImage}
                removeImage={removeImage}
            /> 
            {/*IMAGES*/}

        {/*SAVE BTN*/}
        <__SaveButton loading={loadingFlag} />
         {/*SAVE BTN*/}
      </form>

      {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
    </div> //.editcar--page
    );
} 
export default EditCar; 
