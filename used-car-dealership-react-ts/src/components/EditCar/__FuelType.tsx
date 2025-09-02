import React from "react";
import { fuelType } from "../../constants/fuelType"; //Array of strings with car's fuel Type
import { capitalize } from "../../utils/helpers";

interface FuelTypeProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __FuelType({ value,onChange }: FuelTypeProps) {
    //-->Get list of Fuel Type 
    const car_fueltypes = fuelType; //-->['gas', 'diesel']

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Fuel Type</label>
        <select
            className="form-select"
            name="fuelType"
            value={value || ""}
            onChange={onChange}
        >
        {car_fueltypes.map( (fueltype, index, array) => (
            <option key={fueltype} value={fueltype}>{ capitalize(fueltype) }</option>
        ))}
        </select> 
    </div>
    );
}
