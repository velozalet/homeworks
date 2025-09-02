import React from "react";
import { color } from "../../constants/color"; //Array of strings with car's Color
import { capitalize } from "../../utils/helpers";


interface ColorProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Color({ value,onChange }: ColorProps) {
    //-->Get list of Color 
    const car_colors = color; //-->['black', 'white', 'blue', 'red', 'green', 'yellow']

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Color</label>
        <select
            className="form-select"
            name="color"
            value={value || ""}
            onChange={onChange}
        >
        {car_colors.map( (color, index, array) => (
            <option key={color} value={color}>{ capitalize(color) }</option>
        ))}
        </select> 
    </div>
    );
}
