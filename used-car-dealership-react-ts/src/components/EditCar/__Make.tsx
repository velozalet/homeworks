import React from "react";
import { carMakesAndModels } from "../../constants/carMakesAndModels";
import { capitalize } from "../../utils/helpers";

interface MakeProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Make({ value,onChange }: MakeProps) {
    //-->Get list of Makes
    const car_makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick'] 

	return (
    <div className="col-md-6">
        <label className="form-label text-black">Make</label>
        <select
            className="form-select"
            name="make"
            value={value || ""}
            onChange={onChange}
        >
        {car_makes.map( (make, index, array) => (
            <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : capitalize(make) }</option>
        ))}
        </select> 
    </div>
    );
}
