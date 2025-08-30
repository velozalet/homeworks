import { useState } from "react";
import { createCar } from "../../../services/carService";
import type { Car } from "../../../types/car";

import { carMakesAndModels } from "../../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models
import { bodyStyles } from "../../../constants/bodyStyles"; //Array of strings with car's Body Styles
import { carYears } from "../../../constants/carYears"; //Array of numbers with car's Years
import { fuelType } from "../../../constants/fuelType"; //Array of strings with car's fuel Type
//import { mileageRanges } from "../../../constants/mileageRanges"; Array of Objs with car's Mileage Ranges
import { transmission } from "../../../constants/transmission"; //Array of strings with car's Transmission
import { color } from "../../../constants/color"; //Array of strings with car's Color


function CreateCar() {
    // Local state for form fields (start with a few, you can expand)
    const [formData, setFormData] = useState<Omit<Car, "id">>({
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

    //-->Get list of Makes
    const car_makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick'] 
    //-->Get list of Models according to before selected Makes
    let car_models: string[];
    if( !formData.make ){ car_models = []; }  //case-1: no `Make` chosen
    else if( !carMakesAndModels[formData.make] ){ car_models = []; } //case-2: `Make` chosen but not in our dictionary
    else{  car_models = carMakesAndModels[formData.make]; } //case-3: make chosen and exists in dictionary
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



    //Generic input handler 
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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

    const handleArrayChange = (name: "images" | "options" | "safety", value: string) => {
        setFormData( (prev) => ({
            ...prev,
            [name]: value.split(",").map((item) => item.trim()),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
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

  function capitalize(str:string){ if (!str) return ""; return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(); }

  return (
    <div className="createcar--page container mt-4">
      <h1 className="text-center text-success">Create New Car</h1>

      <form onSubmit={handleSubmit} className="row g-3">
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
            <option value="">Chose Make</option>
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
            { (!formData.make) ? <option value="">First the Make!</option> : "" }
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
                <option key={bodystyle} value={bodystyle}>{ capitalize(bodystyle) }</option>
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
          <label className="form-label text-black">Price</label>
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
          <label className="form-label text-black">Description</label>
          <textarea
            className="form-control"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
        </div>
        {/*Description*/}

        {/*OPTIONS*/}
        <div className="col-12">
            {/* <label className="form-label text-black">Options</label> */}
            <input 
            type="text" 
            className="form-control" 
            placeholder="Options (comma separated)" 
            onChange={(e) => handleArrayChange("options", e.target.value)}
            />
        </div>
         {/*OPTIONS*/}
        {/*SAFETY*/}
        <div className="col-12">
            {/* <label className="form-label text-black">Safety</label>  */}
            <input 
            type="text" 
            className="form-control" 
            placeholder="Safety Features (comma separated)" 
            onChange={(e) => handleArrayChange("safety", e.target.value)} 
            />
        </div>
        {/*SAFETY*/}
        {/*IMAGES*/}
         <div className="col-12">
            {/* <label className="form-label text-black">imases</label>  */}
            <input 
            type="text" 
            className="form-control" 
            placeholder="Images (comma separated URLs)" 
            onChange={(e) => handleArrayChange("images", e.target.value)} 
            />
        </div>
        {/*IMAGES*/}

        <div className="col-12 text-center">
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
