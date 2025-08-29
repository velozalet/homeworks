import { useState } from "react";
import { createCar } from "../../../services/carService";
import type { Car } from "../../../types/car";
import { carMakesAndModels } from "../../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

function CreateCar() {
  // Local state for form fields (start with a few, you can expand)
  const [formData, setFormData] = useState<Omit<Car, "id">>({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    bodyStyle: "",
    color: "",
    mileage: 0,
    transmission: "",
    fuelType: "",
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

  const car_makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick'] 
      //Get list of models for selected make (or empty if none selected)
    let car_models: string[];
    //if (!selectedMake) { models = []; } //case-1: no `Make` chosen
    //else if( !carMakesAndModels[selectedMake] ){ models = []; } //case-2: `Make` chosen but not in our dictionary
    //else{  models = carMakesAndModels[selectedMake]; } //case-3: make chosen and exists in dictionary


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
    setFormData((prev) => ({
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
        bodyStyle: "",
        color: "",
        mileage: 0,
        transmission: "",
        fuelType: "",
        price: 1000,
        images: [], 
        vin: "",
        carfaxClear: true,
        noAccident: false,
        oneOwner: false,
        description: "",
        options: [],
        safety: [],
      });
    } catch (err) {
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
        {/* Make */}
        <div className="col-md-6">
          <label className="form-label text-black">Make</label>
            <select
            className="form-select"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            >
            {car_makes.map( (make, index, array) => (
                <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : capitalize(make) }</option>
            ))}
            </select>
        </div>

        {/* Model */}
        <div className="col-md-6">
          <label className="form-label text-black">Model</label>
          <p className="text-black">{ formData.make }</p>
          <input
            type="text"
            className="form-control"
            name="model"
            placeholder="Model" 
            value={formData.model}
            onChange={handleChange}
            required
          />
            <select
            className="form-select"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            >
            {car_makes.map( (make, index, array) => (
                <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : capitalize(make) }</option>
            ))}
            </select>

            {/* //if (!selectedMake) { models = []; } //case-1: no `Make` chosen
    //else if( !carMakesAndModels[selectedMake] ){ models = []; } //case-2: `Make` chosen but not in our dictionary
    //else{  models = carMakesAndModels[selectedMake]; } //case-3: make chosen and exists in dictionary */}
        </div>

        {/* Year */}
        <div className="col-md-4">
          <label className="form-label text-black">Year</label>
          <input
            type="number"
            className="form-control"
            name="year"
            placeholder="Year" 
            value={formData.year}
            onChange={handleChange}
          />
        </div>

        {/* Body Style */}
        <div className="col-md-4">
        <label className="form-label text-black">Body Style</label>
          <input 
          type="text" 
          name="bodyStyle" 
          className="form-control" 
          placeholder="Body Style" 
          value={formData.bodyStyle} 
          onChange={handleChange} 
          />
        </div>

        {/* Color */}
        <div className="col-md-4">
        <label className="form-label text-black">Color</label>
          <input 
          type="text" 
          name="color" 
          className="form-control" 
          placeholder="Color" 
          value={formData.color} 
          onChange={handleChange} 
          />
        </div>

        {/* Mileage */}
        <div className="col-md-4">
         <label className="form-label text-black">Mileage</label>
          <input 
          type="number" 
          name="mileage" 
          className="form-control" 
          placeholder="Mileage" 
          value={formData.mileage} 
          onChange={handleChange} 
          />
        </div>

        {/* Transmission */}
        <div className="col-md-4">
        <label className="form-label text-black">Transmission</label>
          <input 
          type="text" 
          name="transmission" 
          className="form-control" 
          placeholder="Transmission" 
          value={formData.transmission} 
          onChange={handleChange} 
          />
        </div>

        {/* Fuel Type */}
        <div className="col-md-4">
        <label className="form-label text-black">Fuel Type</label>
          <input 
          type="text" 
          name="fuelType" 
          className="form-control" 
          placeholder="Fuel Type" 
          value={formData.fuelType} 
          onChange={handleChange} 
          />
        </div>

        {/* Price */}
        <div className="col-md-4">
          <label className="form-label text-black">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price" 
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        {/* VIN */}
        <div className="col-md-4">
          <label className="form-label text-black">VIN</label>
          <input
            type="text"
            className="form-control"
            name="vin"
            value={formData.vin}
            onChange={handleChange}
          />
        </div>

        {/* Carfax Clear */}
        <div className="col-md-12">
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

        {/* Description */}
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

        {/* IMAGES */}
         <div className="col-12">
            <input 
            type="text" 
            className="form-control" 
            placeholder="Images (comma separated URLs)" 
            onChange={(e) => handleArrayChange("images", e.target.value)} 
            />
        </div>
        {/* OPTIONS */}
        <div className="col-12">
            <input 
            type="text" 
            className="form-control" 
            placeholder="Options (comma separated)" 
            onChange={(e) => handleArrayChange("options", e.target.value)}
            />
        </div> 
        {/* SAFETY */}
        <div className="col-12">
            <input 
            type="text" 
            className="form-control" 
            placeholder="Safety Features (comma separated)" 
            onChange={(e) => handleArrayChange("safety", e.target.value)} 
            />
        </div>


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
