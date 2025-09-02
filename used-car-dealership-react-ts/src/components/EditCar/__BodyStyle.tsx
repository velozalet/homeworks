import React from "react";
import { bodyStyles } from "../../constants/bodyStyles"; //Array of strings with car's Body Styles
import { capitalize } from "../../utils/helpers";

interface BodyStyleProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __BodyStyle({ value,onChange }: BodyStyleProps) {
    //-->Get list of Body Styles 
    const car_bodystyles = bodyStyles; //-->['sedan', 'suv', 'hatch']

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Body Style</label>
        <select
            className="form-select"
            name="bodyStyle"
            value={value || ""}
            onChange={onChange}
        >
        {car_bodystyles.map( (bodystyle, index, array) => (
            <option key={bodystyle} value={bodystyle}>{ (bodystyle === "suv") ? bodystyle.toUpperCase() : capitalize(bodystyle) }</option>
        ))}
        </select> 
    </div>
    );
}
