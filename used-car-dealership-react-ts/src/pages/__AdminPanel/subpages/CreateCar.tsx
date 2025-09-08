import { useState,useEffect } from "react";
import { createCar,uploadCarImage } from "../../../services/carService";
import type { Car } from "../../../types/car";

import { carMakesAndModels } from "../../../constants/carMakesAndModels";
import { bodyStyles } from "../../../constants/bodyStyles";
import { carYears } from "../../../constants/carYears";
import { fuelType } from "../../../constants/fuelType";
import { transmission } from "../../../constants/transmission";
import { color } from "../../../constants/color";

import { capitalize } from "../../../utils/helpers.ts";  


function CreateCar() { 
    const [formData, setFormData] = useState<Omit<Car,"id">>({  
    make: "",
    model: "",
    year: new Date().getFullYear(),
    bodyStyle: "sedan",
    color: "black",
    mileage: 0,
    transmission: "auto",
    fuelType: "gas",
    price: 0,
    images: [],
    vin: "",
    carfaxClear: true,
    noAccident: false,
    oneOwner: false,
    description: "",
    options: [],
    safety: [],
    });

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    //State for `Options`:
    const [optionInput, setOptionInput] = useState(""); 
    //State for `Safety`:
    const [safetyInput, setSafetyInput] = useState("");
    //State for `Images`:
    const [imageInput, setImageInput] = useState(""); 

    //-->Get list of Makes
    const car_makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick'] 
    //-->Get list of Models according to before selected Makes
    let car_models: string[];
    if( !formData.make ){ car_models = []; }  //case-1: no `Make` chosen
    else if( !carMakesAndModels[formData.make] ){ car_models = []; } //case-2: `Make` chosen but not in our dictionary
    else{  car_models = carMakesAndModels[formData.make]; } //case-3: make chosen and exists in dictionary
    //-->Get list of Years
    const car_years = carYears;
    //-->Get list of Body Styles 
    const car_bodystyles = bodyStyles;
    //-->Get list of Color 
    const car_colors = color;
    //-->Get list of Transmission 
    const car_transmissions = transmission;
   //-->Get list of Fuel Type 
   const car_fueltypes = fuelType;

   //After 4 sec. the notification`Car created successfully!`will br desappeard
   useEffect(() => {
        if( !successMsg ) return;
        const timer = setTimeout(
            ()=>{ return setSuccessMsg("") }, 4000 
        );

        return () => { clearTimeout(timer) }; 
    }, [successMsg]); 


    //Generic input handler 
    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => {
            //Ensure numbers are stored as numbers
            if( ["price","year","mileage"].includes(name) ){
                return { ...prev, [name]: value === "" ? 0 : Number(value) }; //convert to number
            }
            //Handle checkboxes as boolean
            if( type === "checkbox" ) { return { ...prev, [name]: checked }; }
            //Default(strings)
            return { ...prev, [name]: value };
            });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            //Check if `model` is empty before saving
            if( !formData.model || formData.model.trim() === "" ){
                //alert("Model is EMPTY!."); setLoading(false); return; //stop the submit
                if( formData.make ){ formData.model = carMakesAndModels[formData.make][0] } else{ formData.model = "" }
            }else{ formData.model }

            const newCarId = await createCar(formData);
            setSuccessMsg(`✅ Car created successfully! ID: ${newCarId}`);
            setFormData({
                make: "",
                model: "",
                year: new Date().getFullYear(),
                bodyStyle: "sedan",
                color: "black",
                mileage: 0,
                transmission: "auto",
                fuelType: "gas",
                price: 0,
                images: [], 
                vin: "",
                carfaxClear: true,
                noAccident: false,
                oneOwner: false,
                description: "",
                options: [],
                safety: [],
            });
        } catch(err){
            alert("❌ Failed to create car. Check console."); 
            console.error(err);
        }
        setLoading(false);
    };

    {/*OPTIONS*/}
    const addOption = () => {
        if (optionInput.trim() !== "") {
            setFormData((prev) => ({ 
                ...prev,
                options: [...prev.options, optionInput.trim()],
              }));
          setOptionInput(""); //clear input
        }
    };
    const removeOption = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index),
          }));
    };
    {/*OPTIONS*/}
    {/*SAFETY*/}
    const addSafety = () => {
        if (safetyInput.trim() !== "") {
            setFormData((prev) => ({ 
                ...prev,
                safety: [...prev.safety, safetyInput.trim()],
                }));
            setSafetyInput(""); //clear input
        }
    };
    const removeSafety = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            safety: prev.safety.filter((_, i) => i !== index),
            }));
    };
    {/*SAFETY*/}
    {/*IMAGES*/}
    const addImage = () => {
        if (imageInput.trim() !== "") {
            setFormData((prev) => ({ 
                ...prev,
                images: [...prev.images, imageInput.trim()],
                }));
            setImageInput(""); //clear input
        }
    };
    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
            }));
    };
    {/*IMAGES*/}


  return (
    <div className="createcar--page container mt-4">
      <h1 className="text-center">Create New Car</h1>

      <form onSubmit={handleSubmit} className="create-new-car--form row g-3">
        {/*Make*/}
        <div className="col-md-6">
          <label className="form-label text-black">Make</label>
            <select
            className="form-select"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            >
            <option value="">--- Chose Make ---</option>
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
            { (!formData.make) ? <option value="">--- Chose Make first---</option> : "" }
            {car_models.map( (model, index, array) => (
                <option key={model} value={model}>{ capitalize(model) }</option>
            ))}
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
            <div className="d-flex">
                <input
                type="text"
                className="form-control"
                placeholder="Add Option"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addOption())}
                />
                <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={addOption}
                ><i className="fa fa-plus"></i></button> 
            </div>
            {/*Render each next option as block*/} 
            <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.options.map((item, index) => (
                <span
                    key={index}
                    className="badge bg-secondary p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeOption(index)} 
                >{item} ✕ </span> 
                ))} 
            </div>
        </div>
        {/*OPTIONS*/}
        {/*SAFETY*/}
        <div className="col-12">
            <div className="d-flex">
                <input
                type="text"
                className="form-control"
                placeholder="Add Safety"
                value={safetyInput}
                onChange={(e) => setSafetyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSafety())}
                />
                <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={addSafety}
                ><i className="fa fa-plus"></i></button>
            </div>
            {/*Render each next safety as block*/}
            <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.safety.map((item, index) => (
                <span
                    key={index}
                    className="badge bg-secondary p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => removeSafety(index)}
                >{item} ✕ </span>
                ))}
            </div>
        </div>
        {/*SAFETY*/}
        {/*IMAGES*/}
        <div className="col-12">
            <div className="d-flex align-items-center">
                <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={async (e) => {
                    if (!e.target.files?.length) return;
                    const file = e.target.files[0];
                    try {
                    //If no carId yet, generate a temporary one --> const tempCarId = formData.id || "temp"; 
                    const tempCarId = "temp";
                    const url = await uploadCarImage(tempCarId, file); 

                    setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, url],
                    }));
                    } catch (err) {
                    alert("❌ Failed to upload image. Check console.");
                    console.error(err);
                    }
                }}
                />
            </div>
            {/*Render uploaded images*/}
            <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.images.map((item, index) => (
                <span
                    key={index}
                    className="badge bg-secondary p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                    setFormData((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                    }))
                    }
                >
                    {item} ✕
                </span>
                ))}
            </div>
        </div>
        {/*IMAGES*/}

        <div className="col-12 text-center pb-5">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Save Car"}
          </button>
        </div>
      </form>

      {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
    </div>
  );
}
export default CreateCar;
